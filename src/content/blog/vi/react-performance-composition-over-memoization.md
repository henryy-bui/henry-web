---
title: "Tối Ưu Hiệu Suất React Theo Mô Hình SMART: Composition over Memoization"
date: "2026-08-04"
description: "Hướng dẫn chuyên sâu về việc kiểm soát quá trình hòa giải của React Fiber bằng kiến trúc: Moving State Down, Composition và Split Context Providers thay vì lạm dụng memoization."
tags: ["React", "Hiệu suất", "Kiến trúc"]
---

Trong kỹ thuật phần mềm hiện đại, hiệu suất không đơn thuần là cảm giác "mượt". Đó là kết quả của một tư duy hệ thống và khả năng kiểm soát chặt chẽ quá trình hòa giải (reconciliation) của React Fiber. Sai lầm lớn nhất của các kỹ sư là triển khai các giải pháp "chắp vá" như lạm dụng memoization mà thiếu đi một mục tiêu kỹ thuật rõ ràng. Để tối ưu hóa thực sự, chúng ta phải bắt đầu với mô hình SMART để định hướng chiến lược kiến trúc.

## 1. Xác lập mục tiêu tối ưu hóa theo mô hình SMART

Việc tối ưu hóa mà không dựa trên dữ liệu đo lường là một thất bại kiến trúc. Mô hình SMART giúp chúng ta thoát khỏi cái bẫy "tối ưu hóa sớm" (premature optimization) và tập trung vào những thay đổi có tác động lớn nhất.

| Yếu tố SMART | Chỉ số Kỹ thuật cho Senior Engineer |
| --- | --- |
| **Specific** (Cụ thể) | Cô lập phạm vi ảnh hưởng của state (state isolation). Triệt tiêu chuỗi thác re-render (cascade of unnecessary reconciliations) bằng cách tái cấu trúc cây render (Render Tree) thay vì dựa dẫm vào `useMemo` hay `useCallback`. |
| **Measurable** (Đo lường) | Hạ chỉ số Interaction to Next Paint (INP) từ 500ms xuống dưới 50ms; duy trì ngân sách thực thi trên Main Thread trong ngưỡng 13.3ms (để bù trừ cho chi phí hệ thống) nhằm đạt chuẩn 60 FPS. |
| **Achievable** (Khả thi) | Thực thi các mẫu thiết kế (design patterns) chính thống: Moving State Down và Children/Elements as Props để tận dụng cơ chế so sánh tham chiếu của React Fiber. |
| **Relevant** (Liên quan) | Duy trì tính sạch của mã nguồn (clean code), giảm thiểu bộ nhớ đệm (cache overhead) và cải thiện khả năng phản hồi của UI (UI responsiveness). |
| **Time-bound** (Thời hạn) | Hoàn tất phân tích biểu đồ ngọn lửa (Flamegraph) và đạt chỉ số mục tiêu trước khi đóng gói giai đoạn phát triển (Development freeze). |

Để đạt được các con số này, kỹ sư trưởng phải nắm vững bản chất của Fiber Architecture: React không quan tâm props có thay đổi hay không; nó re-render mọi thứ theo mặc định trừ khi chúng ta chủ động can thiệp vào cấu trúc sở hữu của component (Component Ownership).

## 2. Phân tích cơ chế Re-render và "Huyền thoại" về Memoization

**Sự thật về Re-render:** Một quan niệm sai lầm phổ biến là "Component chỉ re-render khi props thay đổi". Thực tế, React vận hành theo nguyên tắc: khi state của một component cập nhật, React sẽ đệ quy re-render tất cả các component con của nó, bất kể props có thay đổi hay không. Quá trình này tạo ra một cây Element mới (những immutable objects mô tả UI) và so sánh chúng với cây cũ (Diffing) để cập nhật DOM thật.

**Cái giá của Memoization:** Nhiều lập trình viên coi `React.memo` là viên đạn bạc. Tuy nhiên, `React.memo` tiêu tốn CPU cho việc kiểm tra tham chiếu (`Object.is`) trên mọi prop. Nếu component đơn giản, chi phí cho việc kiểm tra này và chi phí bộ nhớ để lưu trữ cache cho `useMemo` thường lớn hơn cả chi phí re-render trực tiếp.

Dựa trên nguyên lý từ *Advanced React*, memoization chỉ được phép sử dụng trong 3 trường hợp cụ thể:

1. Component cực kỳ nặng và được bọc trong `React.memo` với các props có tham chiếu ổn định.
2. Giá trị được dùng làm dependency cho các hook khác (như `useEffect` hoặc `useMemo` cấp thấp hơn).
3. Truyền giá trị xuống các component con vốn đã được memoize để tránh làm hỏng chuỗi ổn định tham chiếu.

Thay vì xử lý triệu chứng bằng cache, chúng ta sẽ xử lý tận gốc bằng cách cô lập phạm vi hòa giải.

## 3. Kỹ thuật 1: Di chuyển State xuống dưới (Moving State Down)

Tư duy cốt lõi ở đây là "Cô lập sự thay đổi". Việc đặt state quá cao (ví dụ: ở Root) khiến mỗi tương tác nhỏ cũng buộc toàn bộ Fiber tree phải tính toán lại.

**Tình huống kỹ thuật:** Một Modal Dialog đóng/mở làm lag toàn bộ ứng dụng vì state `isOpen` được đặt tại `App`, gây ra quá trình hòa giải vô ích cho các "Slow Components" anh em.

```jsx
// Trước: State đặt tại Root gây re-render diện rộng
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="layout">
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && <ModalDialog />}
      <VerySlowComponent /> {/* Bị ép re-render vô ích */}
    </div>
  );
};

// Sau: Cô lập state vào sub-branch độc lập
const ButtonWithModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && <ModalDialog />}
    </>
  );
};

const App = () => {
  return (
    <div className="layout">
      <ButtonWithModal />
      <VerySlowComponent /> {/* Không bị ảnh hưởng bởi logic Modal */}
    </div>
  );
};
```

**Đánh giá:** Kỹ thuật này tạo ra một ranh giới render (render boundary). Khi state thay đổi, React chỉ cần duyệt lại nhánh con `ButtonWithModal`, bỏ qua hoàn toàn các nhánh anh em nặng nề.

## 4. Kỹ thuật 2: Composition — Truyền Component làm Props

Khi state không thể di chuyển xuống vì các component con cần dữ liệu đó, chúng ta phải thay đổi quyền sở hữu (Ownership) của các component nặng.

Bản chất React Elements (`<Component />`) là các đối tượng bất biến (immutable objects). Nếu một element được tạo ra ở component cha và truyền xuống component con qua props (như `children`), tham chiếu của element đó sẽ không đổi khi component con cập nhật state nội bộ.

### Children as Props (Tối ưu hóa Scroll)

Minh họa cách vượt qua quá trình re-render của một Layout phức tạp khi scroll:

```jsx
const ScrollableWithMovingBlock = ({ children }) => {
  const [position, setPosition] = useState(0);
  return (
    <div onScroll={(e) => setPosition(e.target.scrollTop)}>
      <MovingBlock position={position} />
      {/* React thấy 'children' có tham chiếu Object.is không đổi, nên bỏ qua re-render nhánh này */}
      {children}
    </div>
  );
};

const App = () => {
  return (
    <ScrollableWithMovingBlock>
      <VerySlowComponent /> {/* Được tạo tại App, có tham chiếu ổn định */}
    </ScrollableWithMovingBlock>
  );
};
```

### Elements as Props (Layout phức tạp)

Chúng ta có thể mở rộng sang các prop như `leftColumn` hay `rightColumn` để đảm bảo các vùng Layout tĩnh không bao giờ bị re-render bởi state của khung Layout chính.

## 5. Kỹ thuật 3: Tách biệt các Context Provider (Split Context Providers)

"Context Gremlin" xuất hiện khi một thay đổi nhỏ trong context (ví dụ: cập nhật một field dữ liệu) làm re-render tất cả các component sử dụng `useContext`, bất kể chúng có dùng field đó hay không. `useContext` sẽ bỏ qua mọi `React.memo` nằm giữa.

**Anti-pattern:** Nhồi nhét cả state và dispatch vào một object duy nhất trong `value` của Provider. Mỗi khi state đổi, một object mới được tạo ra, phá vỡ tính ổn định tham chiếu.

**Giải pháp Senior:** Tách biệt Static API (Hành động) và Dynamic Data (Dữ liệu). Sử dụng `useReducer` vì hàm `dispatch` có tham chiếu ổn định tuyệt đối theo mặc định trong vòng đời của component.

```jsx
const NavigationController = ({ children }) => {
  const [isNavExpanded, dispatch] = useReducer(reducer, false);

  // ApiContext chứa các hàm hành động không bao giờ thay đổi tham chiếu
  const api = useMemo(() => ({
    open: () => dispatch({ type: 'open' }),
    close: () => dispatch({ type: 'close' })
  }), []); // dispatch ổn định, không cần dependencies

  return (
    <ApiContext.Provider value={api}>
      <DataContext.Provider value={isNavExpanded}>
        {children}
      </DataContext.Provider>
    </ApiContext.Provider>
  );
};
```

Với cấu trúc này, một component chỉ cần gọi `api.open()` sẽ không bao giờ bị re-render khi `isNavExpanded` thay đổi.

## 6. Đo lường và Kiểm chứng (Measurable Layer)

Cảm giác "mượt hơn" là chủ quan. Một Senior Engineer cần các con số định lượng.

- **React Profiler:** Phân tích Flamegraph. Nếu một component xuất hiện màu vàng/cam (Ranked) mà không có lý do logic để thay đổi, đó là mục tiêu cần tái cấu trúc.
- **Chrome DevTools & INP:** Interaction to Next Paint là chỉ số quan trọng nhất để đo độ trễ tương tác. Ngưỡng lý tưởng là dưới 50ms.
- **Ngân sách 60 FPS (13.3ms):** Mặc dù một khung hình có 16.6ms, nhưng trình duyệt và hệ thống luôn chiếm dụng một phần tài nguyên (browser overhead). Để tránh hiện tượng "Jank" (giật lag), mã thực thi của chúng ta không được chặn Main Thread quá 13.3ms.

**Kết quả thực tế:**

- **Trước tối ưu:** INP 500ms (Main Thread bị chặn bởi chuỗi thác re-render dư thừa).
- **Sau tối ưu:** INP 50ms (Nhờ Composition, React chỉ thực hiện hòa giải trên các nhánh nhỏ thực sự cần thiết).

## 7. Kết luận và Danh mục kiểm tra (Checklist)

Kiến trúc tốt luôn ưu việt hơn Memoization. Việc bọc code trong các hook cache chỉ là cách xử lý phần ngọn, trong khi việc kiểm soát Component Ownership thông qua Composition mới là cách xử lý tận gốc vấn đề hiệu suất.

Engineering Checklist trước khi sử dụng `useMemo`/`React.memo`:

1. **Render Tree Ownership:** Đã thử di chuyển state xuống dưới để cô lập phạm vi hòa giải chưa?
2. **Immutable Elements:** Đã áp dụng Composition (children/elements as props) để giữ tham chiếu Element ổn định chưa?
3. **Context Splitting:** Đã tách riêng Provider cho Data (biến động) và API (tĩnh) chưa?
4. **Metric-driven Validation:** Đã kiểm tra INP qua Chrome DevTools và đảm bảo ngân sách thực thi không vượt quá 13.3ms chưa?

Hãy nhớ: 60 FPS là tiêu chuẩn bắt buộc của một sản phẩm chất lượng cao, không phải là tùy chọn. Đừng để bộ nhớ đệm che lấp đi một kiến trúc tồi.
