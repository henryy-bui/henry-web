---
title: "React Server Components Thực Sự Thay Đổi Điều Gì?"
date: "2024-07-08"
description: "Góc nhìn từ trải nghiệm thực tế với RSC internals tại Vercel: RSC giải quyết được gì, không giải quyết được gì và khi nào nên dùng."
tags: ["React", "Next.js", "Hiệu năng web", "Kiến trúc"]
---

Mình đã có khoảng hai năm làm với phần internals của React Server Components (RSC) ở Vercel. Góc nhìn này có thể hơi thiên lệch, nhưng là thiên lệch dựa trên trải nghiệm thật. Mình sẽ đi thẳng vào phần quan trọng, bỏ qua hype.

## RSC là gì (và không phải là gì)

RSC **không phải** static site generation. Nó cũng **không phải** server-side rendering (SSR) theo kiểu cũ. Đây là một execution model mới: một phần component chỉ chạy trên server, output được stream về client dưới dạng cây đã serialize.

Điểm mấu chốt là: **Server Component có thể async**.

```tsx
// Chạy ở server. Không useEffect, không fetch phía client.
async function UserProfile({ id }: { id: string }) {
  const user = await db.users.findById(id); // truy cập DB trực tiếp

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}
```

Không `useEffect`, không state loading ở client, không cần API route trung gian. Chỉ còn data và UI.

## Thay đổi về tư duy kiến trúc

Với React truyền thống:

```
Browser → API Route → DB → JSON → Client render
```

Với RSC:

```
Request → Server Component → DB → HTML/RSC payload → Client
```

Toàn bộ component tree được **duyệt từ server**, còn các Client Component sẽ được hydrate đúng vị trí trong cây.

## Những gì thực sự tốt hơn

### 1. Data fetching "zero-bundle"

Những component chỉ fetch và hiển thị dữ liệu có thể gửi **0 byte JavaScript** xuống client:

```tsx
// Server Component — 0 byte JS gửi xuống client
async function RecentPosts() {
  const posts = await getPosts(); // chạy server-side
  return <PostList posts={posts} />; // PostList có thể là Client Component
}
```

Với app thiên về nội dung hoặc dashboard nhiều data, lợi ích rất rõ. Benchmark nội bộ team mình từng ghi nhận giảm 40-60% JavaScript ở một số trang dashboard.

### 2. Colocation mà không lộ bí mật

Bạn có thể import trực tiếp code chỉ dành cho server (env vars, DB client, secrets) ngay trong component:

```tsx
import { S3Client } from "@aws-sdk/client-s3";

// Module này không bao giờ đi vào client bundle
const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function ImageGallery() {
  const images = await listBucketImages(s3);
  return <Gallery images={images} />;
}
```

### 3. Streaming với `<Suspense>`

RSC streaming cho phép server trả từng phần UI ngay khi phần đó sẵn sàng:

```tsx
export default function Dashboard() {
  return (
    <Layout>
      <Header /> {/* hiển thị ngay */}
      <Suspense fallback={<Spinner />}>
        <RecentActivity /> {/* stream khi xong */}
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Metrics /> {/* stream độc lập */}
      </Suspense>
    </Layout>
  );
}
```

Người dùng nhìn thấy nội dung dần dần thay vì phải đợi query chậm nhất.

## Những gì RSC không giải quyết

RSC không tự động xử lý các vấn đề sau:

- **State management**: Zustand, Redux, context vẫn nằm ở Client Components
- **Interactivity**: Mọi thứ event-driven vẫn cần Client Components
- **Độ phức tạp build**: Ranh giới server/client tạo thêm một lớp failure mode mới để debug

## Ranh giới `"use client"`

Directive `"use client"` là nơi bắt đầu phần tương tác phía client:

```tsx
"use client";

import { useState } from "react";

export function SearchBox({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("");

  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
      }}
    />
  );
}
```

Mặc định, mọi thứ **ở trên** boundary là Server Component. Mọi thứ **bên trong** Client Component thì chạy phía client.

## Quan điểm cá nhân sau 2 năm

RSC thật sự phù hợp với:

- **Dashboard nặng data fetching**
- **Content site** nơi phần lớn trang là read-only
- **Ứng dụng có logic nhạy cảm** (auth, billing) không muốn lộ ra client

RSC thường gây thêm chi phí với:

- **Ứng dụng tương tác cao** (liên tục va vào boundary server/client)
- **Team nhỏ** chưa có bandwidth để nắm vững mental model mới
- **Ứng dụng cũ** mà chi phí migration lớn hơn lợi ích nhận được

Kết luận ngắn gọn: công nghệ này có giá trị thật, hiệu quả cũng thật, nhưng đừng rewrite app chỉ vì trend. Chỉ nên dùng khi nó xử lý được một bài toán đủ rõ và đủ đau của bạn.
