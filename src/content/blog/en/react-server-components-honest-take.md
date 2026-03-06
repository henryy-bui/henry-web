---
title: "React Server Components: What They Actually Change"
date: "2024-07-08"
description: "After working on RSC internals at Vercel, here's my honest take on what React Server Components actually change about how you build apps — and what they don't."
tags: ["React", "Next.js", "Web Performance", "Architecture"]
---

I spent two years working on React Server Components (RSC) internals at Vercel. This gives me a biased-but-informed perspective on what RSC actually changes. Let me cut through the hype.

## What RSC Is (and Isn't)

RSC is **not** static site generation. It's **not** server-side rendering (SSR). It's a new execution model where some components run only on the server and their output is streamed to the client as a serialized tree.

The key insight: **RSC components can be async**:

```tsx
// This runs on the server. No useEffect, no fetch on client.
async function UserProfile({ id }: { id: string }) {
  const user = await db.users.findById(id); // Direct DB access

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}
```

No `useEffect`. No loading state. No API route. Just data.

## The Mental Model Shift

With traditional React:

```
Browser → API Route → DB → JSON → Client render
```

With RSC:

```
Request → Server Component → DB → HTML/RSC payload → Client
```

The component tree is **traversed on the server**, with client components hydrated in-place.

## What Actually Gets Better

### 1. Zero-bundle data fetching

Components that only fetch and display data ship **no JavaScript** to the client:

```tsx
// Server Component — 0 bytes sent to client
async function RecentPosts() {
  const posts = await getPosts(); // runs server-side
  return <PostList posts={posts} />; // PostList may be a Client Component
}
```

For content-heavy apps, this is massive. Our internal benchmarks showed 40-60% JS reduction on dashboard pages.

### 2. Colocation without exposure

You can import server-only code (env vars, DB clients, secrets) directly in components:

```tsx
import { S3Client } from "@aws-sdk/client-s3";

// This module never reaches the client bundle
const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function ImageGallery() {
  const images = await listBucketImages(s3);
  return <Gallery images={images} />;
}
```

### 3. Streaming with `<Suspense>`

RSC streaming means the server can send parts of the page as they're ready:

```tsx
export default function Dashboard() {
  return (
    <Layout>
      <Header /> {/* instant */}
      <Suspense fallback={<Spinner />}>
        <RecentActivity /> {/* streams when ready */}
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Metrics /> {/* streams independently */}
      </Suspense>
    </Layout>
  );
}
```

Users see content progressively instead of waiting for the slowest query.

## What Doesn't Change

RSC doesn't fix:

- **State management** — Zustand, Redux, and context still live in Client Components
- **Interactivity** — Anything event-driven is still a Client Component
- **Build complexity** — The server/client boundary adds a new failure mode to reason about

## The "use client" Boundary

The `"use client"` directive marks the boundary where client interactivity begins:

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

Everything **above** the boundary is a Server Component by default. Everything **inside** a Client Component is client-only.

## My Take After 2 Years

RSC is genuinely good for:

- **Dashboard-heavy apps** with lots of data fetching
- **Content sites** where most pages are read-only
- **Apps with sensitive server logic** (auth, billing) that shouldn't reach the client

RSC adds complexity for:

- **Highly interactive apps** (you'll constantly be fighting the server/client boundary)
- **Small teams** who don't have bandwidth to understand the mental model
- **Existing apps** where migration cost outweighs the benefit

The technology is real. The gains are real. But don't rewrite your app for RSC unless you have a clear problem it solves.
