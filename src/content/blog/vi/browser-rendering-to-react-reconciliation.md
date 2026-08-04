---
title: "Hiểu Sâu về Luồng Xử lý: Từ Browser Rendering đến React Reconciliation"
date: "2026-08-04"
description: "Mổ xẻ sự phối hợp giữa Critical Rendering Path của trình duyệt và cơ chế Reconciliation của React: state là gốc rễ của re-render, thuật toán diffing, vai trò của key, và thời điểm chính xác useLayoutEffect chặn Paint."
tags: ["React", "Trình duyệt", "Hiệu suất"]
---

## 1. Lời mở đầu: Tại sao "Hiểu bản chất" lại quan trọng?

Để trở thành một "React Guru", khả năng viết code chạy được chỉ là điều kiện cần. Điều kiện đủ là bạn phải thấu hiểu những gì thực sự diễn ra "dưới nắp ca-pô" (under the hood) — nơi React và trình duyệt phối hợp nhịp nhàng để chuyển đổi logic JavaScript thành những pixel trên màn hình.

Hiệu năng của một ứng dụng không đơn thuần nằm ở việc code ngắn hay dài, mà nằm ở việc bạn có tối ưu được quy trình Render và Paint hay không. Nếu không hiểu cách React "nghĩ" và cách trình duyệt "vẽ", bạn sẽ dễ rơi vào cái bẫy tối ưu hóa mù quáng. Bài viết này sẽ mổ xẻ sự phối hợp giữa Browser Critical Rendering Path và React Reconciliation để giúp bạn làm chủ pipeline hiển thị của ứng dụng.

## 2. Quy trình dựng hình của Trình duyệt (Browser Critical Rendering Path)

### Cơ chế thực thi tác vụ (Browser Tasks)

Trình duyệt quản lý mọi hoạt động thông qua các "Tác vụ" (Tasks). Một điểm cốt tử mà mọi kỹ sư cần nắm vững: JavaScript là ngôn ngữ đồng bộ (synchronous) và có tính chất chặn (blocking). Khi một Task JavaScript đang thực thi, nó sẽ chiếm dụng Main Thread và chặn đứng quy trình Paint (vẽ). Trình duyệt chỉ có cơ hội vẽ lại giao diện sau khi Task JavaScript hiện tại hoàn thành hoàn toàn.

Quy trình dựng hình cơ bản của trình duyệt (Critical Rendering Path) bao gồm:

1. **Parse HTML:** Chuyển đổi mã nguồn HTML thành cấu trúc cây DOM.
2. **Build DOM:** Xây dựng các đối tượng tài liệu trong bộ nhớ.
3. **Execute JS:** Thực thi mã JavaScript (đây là giai đoạn "chặn" pipeline).
4. **Layout:** Tính toán hình học (vị trí, kích thước) của từng phần tử.
5. **Paint:** Đổ pixel thực tế lên màn hình thông qua GPU.

### Khái niệm "Painting" vs "React Rendering"

Lập trình viên thường nhầm lẫn giữa hai khái niệm này. Thực tế, chúng diễn ra ở hai cấp độ khác nhau:

| Đặc tính | React Re-render (Render Phase) | Browser Paint/Repaint |
| --- | --- | --- |
| **Bản chất** | Gọi function component, thực thi hooks, tính toán kết quả trả về. | Vẽ các pixel thực tế lên màn hình dựa trên tính toán Layout. |
| **Sản phẩm** | Tạo ra cây Fiber mới (Virtual DOM) mô tả trạng thái UI. | Cập nhật hình ảnh thực tế mà người dùng nhìn thấy. |
| **Tác động** | Chỉ diễn ra trong bộ nhớ JavaScript, chưa ảnh hưởng đến UI. | Thao tác nặng nề nhất, làm nghẽn Pipeline nếu xảy ra liên tục. |

## 3. Hoạt động của React: Cơ chế Reconciliation và Re-render

### Nguồn gốc của mọi Re-render

State (Trạng thái) là nguồn gốc duy nhất kích hoạt re-render. Khi state thay đổi, React sẽ lan truyền quá trình re-render xuống tất cả các component con (downstream) theo cây thư mục.

**Đập tan lầm tưởng (The Big Myth):** "Component re-render khi Props thay đổi" là một nhận định sai lầm phổ biến. Thực tế, React re-render con khi cha re-render, bất kể props của con có thay đổi hay không (trừ khi bạn sử dụng `React.memo`). Props chỉ là dữ liệu đi kèm, không phải là nguyên nhân gây ra lệnh re-render trong điều kiện bình thường.

### Cấu trúc dữ liệu bên dưới (Fiber Tree & Elements)

React sử dụng cấu trúc Fiber Tree để quản lý Reconciliation hiệu quả hơn. Trong quy trình này, React phân biệt rõ:

- **Component:** Là hàm (function) hoặc lớp (class) chứa logic.
- **Element:** Là đối tượng JavaScript đơn giản (Object) trả về từ `React.createElement`.
- **Cấu trúc Element:** Bao gồm `type` (kiểu phần tử) và `props` (các thuộc tính). Element chính là những "viên gạch" nhẹ nhàng để React xây dựng Virtual DOM trước khi cập nhật DOM thật.

### Thuật toán Diffing (So sánh khác biệt)

Khi re-render, React so sánh cây Element cũ và mới dựa trên hai yếu tố chính: Kiểu (`type`) và Vị trí (position).

- **Nếu `type` thay đổi:** React sẽ hủy bỏ (unmount) component cũ và gắn mới (mount) từ đầu. Mọi state bên trong sẽ bị xóa sạch.
- **Nếu `type` giữ nguyên:** React giữ lại instance hiện có, chỉ cập nhật các thuộc tính (attributes) thay đổi.
- **Vị trí quan trọng:** React so sánh các phần tử tại cùng một vị trí trong mảng con (children array). Nếu bạn hoán đổi vị trí hai Input cùng kiểu mà không dùng `key`, React sẽ tái sử dụng (reuse) DOM node và giữ lại state của Input cũ cho Input mới, dẫn đến lỗi "Mysterious Bug" (ví dụ: gõ text vào Input A nhưng khi hoán đổi lại thấy text đó nằm ở Input B).

### Vai trò của Thuộc tính "Key"

`key` là định danh duy nhất giúp React nhận diện phần tử xuyên suốt các lần render.

- **Bản chất:** Giúp React khớp (match) các phần tử cũ và mới dù vị trí của chúng trong mảng có thay đổi.
- **Kỹ thuật State Reset:** Bạn có thể thay đổi `key` của một component để ép React hiểu rằng đây là một phần tử hoàn toàn mới, từ đó xóa sạch state cũ một cách chủ động.
- **Lưu ý:** Không bao giờ dùng index làm `key` cho danh sách động vì nó sẽ phá vỡ khả năng nhận diện vị trí của Diffing.

## 4. Cách React đồng bộ hóa Effects với quy trình Paint của Trình duyệt

### Vấn đề giao diện bị nháy (Flickering UI)

Hãy xét tình huống menu điều hướng (Responsive Navigation): Bạn cần Render lần 1 (hiện tất cả link) → Đo kích thước DOM → Render lần 2 (ẩn các link thừa). Nếu dùng `useEffect`, trình duyệt sẽ Paint kết quả Render lần 1 lên màn hình trước khi thực hiện Render lần 2, gây ra hiện tượng "nháy" giao diện cực kỳ khó chịu.

### So sánh useEffect và useLayoutEffect

- **`useEffect`:** Chạy bất đồng bộ (asynchronous), thực thi **SAU KHI** trình duyệt đã Paint. Đây là lý do nó gây ra hiện tượng nháy.
- **`useLayoutEffect`:** Chạy đồng bộ (synchronous) ngay sau khi DOM cập nhật nhưng **TRƯỚC KHI** trình duyệt Paint. Nó chặn Task Paint cho đến khi logic bên trong hoàn thành.

Sơ đồ luồng xử lý chi tiết:

1. **React Render:** Tính toán cây Fiber mới, gọi function component.
2. **Commit DOM:** Cập nhật các thay đổi vào cây DOM thực nhưng chưa vẽ lên màn hình.
3. **`useLayoutEffect`:** Chạy đồng bộ, cho phép đo đạc DOM và cập nhật state lần nữa — giai đoạn này chặn Paint.
4. **Browser Paint:** Trình duyệt vẽ kết quả UI cuối cùng lên màn hình.
5. **`useEffect`:** Chạy bất đồng bộ sau khi người dùng đã nhìn thấy UI.

**Lời khuyên về hiệu năng:** Bạn không nên lạm dụng `useLayoutEffect`. Vì nó chạy đồng bộ trước Paint, nó sẽ gia tăng thời gian Total Blocking Time (TBT), làm chậm quá trình hiển thị chính của trình duyệt và khiến ứng dụng có cảm giác bị "lag".

## 5. Ví dụ Tổng quát & Diagram Trực quan

Dưới đây là ví dụ về một component Navigation tối ưu, sử dụng memoization và `useLayoutEffect` để xử lý giao diện:

```jsx
// NavLink được memoize để tránh re-render thừa khi cha thay đổi visibleCount
const NavLink = React.memo(({ data }) => {
  return <a href={data.url}>{data.title}</a>;
});

const Navigation = ({ items }) => {
  const [visibleCount, setVisibleCount] = useState(items.length);
  const containerRef = useRef();

  // useLayoutEffect chặn Paint để tính toán lại số lượng link hiển thị
  useLayoutEffect(() => {
    const width = containerRef.current.offsetWidth;
    const actualFit = calculateFit(width, items);
    setVisibleCount(actualFit);
  }, [items]);

  return (
    <div ref={containerRef} className="nav-container">
      {items.slice(0, visibleCount).map(item => (
        <NavLink key={item.id} data={item} />
      ))}
    </div>
  );
};
```

Mô phỏng Diagram luồng xử lý:

```text
[ State Update ]
      |
      v
( React Re-render: Fiber Diffing )
      |
      v
[ Commit DOM Changes ]
      |
      v
( useLayoutEffect: Sync Logic )
      |
      v
[ Browser Layout & Paint ]
      |
      v
( useEffect: Async Logic )
```

## 6. Kết luận và Các điểm mấu chốt (Key Takeaways)

- **Re-render không phải là Paint:** React có thể thực hiện nhiều lượt re-render trong bộ nhớ, nhưng trình duyệt chỉ vẽ pixel khi Task JavaScript kết thúc và nhường chỗ cho Main Thread.
- **State là gốc rễ, Props là hệ quả:** Mọi chu kỳ render đều bắt đầu từ state. Props thay đổi không trực tiếp gây re-render trừ khi component cha của nó re-render.
- **Phân biệt Element và Component:** Element là các object mô tả UI trong Fiber Tree. Hiểu được điều này giúp bạn nắm bắt cơ chế so sánh Type và Position trong Reconciliation.
- **Key là định danh vĩnh cửu:** Sử dụng `key` ổn định để giúp React nhận diện phần tử chính xác, tránh re-render thừa hoặc mất focus/state một cách bí ẩn.
- **Thận trọng với Layout Effect:** Chỉ sử dụng `useLayoutEffect` khi cần xử lý các phép đo DOM để tránh Flickering UI. Việc lạm dụng nó sẽ chặn đứng luồng hiển thị chính và làm giảm trải nghiệm người dùng.
