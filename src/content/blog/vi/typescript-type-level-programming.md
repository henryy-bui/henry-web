---
title: "Type-Level Programming trong TypeScript: Từ Cơ Bản đến Nâng Cao"
date: "2024-09-14"
description: "Hướng dẫn thực chiến về type system của TypeScript như một ngôn ngữ riêng: từ conditional types đến query builder type-safe."
tags: ["TypeScript", "Hệ thống kiểu", "Lập trình meta"]
---

Type system của TypeScript là Turing-complete. Điều này không chỉ để "khoe kiến thức" - nó có nghĩa là bạn có thể viết **cả chương trình chạy ở thời điểm compile**. Bài viết này đi từ generics quen thuộc đến việc dựng một SQL query builder type-safe mà không thêm runtime overhead.

## Nền tảng: Generics và Constraints

Có thể bạn dùng generics hằng ngày rồi:

```typescript
function identity<T>(x: T): T {
  return x;
}
```

Sức mạnh thật sự đến từ constraints:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alex", age: 30 };
const name = getProperty(user, "name"); // string - an toàn kiểu tuyệt đối
```

## Conditional Types

Conditional types cho phép rẽ nhánh ở cấp độ kiểu:

```typescript
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>; // true
type B = IsArray<string>; // false
```

Kết hợp với `infer`, bạn có thể bóc tách thông tin kiểu:

```typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Result = UnwrapPromise<Promise<string>>; // string
```

## Template Literal Types

Đây là một trong những bổ sung mạnh nhất vài năm gần đây:

```typescript
type EventName = "click" | "focus" | "blur";
type Handler = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"
```

Bạn có thể dùng nó để ép convention ngay từ compile time:

```typescript
type CSSProperty = `--${string}`;

function setVar(name: CSSProperty, value: string): void {
  document.documentElement.style.setProperty(name, value);
}

setVar("--accent-color", "#6366f1"); // ✓ hợp lệ
setVar("accent-color", "#6366f1"); // ✗ lỗi kiểu
```

## Xây Query Builder Type-Safe

Phần thú vị bắt đầu ở đây. Ta xây query builder mà tên cột được suy luận trực tiếp từ schema:

```typescript
type Schema = {
  users: { id: number; name: string; email: string };
  posts: { id: number; title: string; userId: number };
};

type TableName = keyof Schema;
type Columns<T extends TableName> = keyof Schema[T];

class QueryBuilder<T extends TableName> {
  private table: T;

  constructor(table: T) {
    this.table = table;
  }

  select<K extends Columns<T>>(...cols: K[]): SelectQuery<T, K> {
    return new SelectQuery(this.table, cols);
  }
}

// Usage:
const q = new QueryBuilder("users").select("name", "email"); // ✓ chỉ cho "id" | "name" | "email"

// Compile error:
const q2 = new QueryBuilder("users").select("title"); // ✗ "title" không tồn tại trong "users"
```

## Mapped Types để Transform kiểu

Mapped types cho phép transform toàn bộ thuộc tính trong một type:

```typescript
// Biến mọi field thành optional + nullable
type Partial<T> = { [K in keyof T]?: T[K] | null };

// Biến mọi field thành readonly
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// Tạo kiểu "patch" trong đó một số field bắt buộc
type Patch<T, Required extends keyof T> = Partial<T> & Pick<T, Required>;

type UserPatch = Patch<User, "id">;
// { id: number; name?: string | null; email?: string | null }
```

## Recursive Types

TypeScript hỗ trợ recursive generic types, rất hữu ích để biểu diễn cấu trúc lồng sâu:

```typescript
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

type DeepReadonly<T> = T extends (infer U)[]
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;
```

## Dùng đến đâu là vừa?

Type-level programming rất mạnh, nhưng cũng có cái giá của nó:

- **Type checking chậm hơn** - kiểu phức tạp có thể làm `tsc` chậm đi rõ rệt
- **Khó debug hơn** - error message dễ trở nên khó đọc
- **Onboarding khó hơn** - thành viên mới có thể bị "ngợp" bởi quá nhiều magic

Quy tắc mình hay áp dụng: dùng kỹ thuật nâng cao **ở boundary của thư viện hoặc module dùng chung**, nơi lợi ích type safety được nhân lên ở nhiều call site.

TypeScript compiler là một đồng đội rất đáng tin. Càng cung cấp type information chính xác, bạn càng bắt được bug sớm trước khi chạy test hoặc lên production.
