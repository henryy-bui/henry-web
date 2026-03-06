---
title: "TypeScript Type-Level Programming: From Basics to Mind-Bending Tricks"
date: "2024-09-14"
description: "A practical guide to TypeScript's type system as a programming language in its own right — conditional types, template literals, and building a type-safe SQL query builder."
tags: ["TypeScript", "Type System", "Meta-programming"]
---

TypeScript's type system is Turing-complete. That's not just trivia — it means you can write **entire programs that run at compile time**. This post goes from everyday generics to constructing a fully type-safe SQL query builder without any runtime overhead.

## The Basics: Generics and Constraints

You probably use generics already:

```typescript
function identity<T>(x: T): T {
  return x;
}
```

But constraints unlock the real power:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alex", age: 30 };
const name = getProperty(user, "name"); // string — fully typed!
```

## Conditional Types

Conditional types let you branch at the type level:

```typescript
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>; // true
type B = IsArray<string>; // false
```

Combined with `infer`, you can extract type information:

```typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Result = UnwrapPromise<Promise<string>>; // string
```

## Template Literal Types

One of the most powerful recent additions:

```typescript
type EventName = "click" | "focus" | "blur";
type Handler = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"
```

You can use this to enforce naming conventions at compile time:

```typescript
type CSSProperty = `--${string}`;

function setVar(name: CSSProperty, value: string): void {
  document.documentElement.style.setProperty(name, value);
}

setVar("--accent-color", "#6366f1"); // ✓ Valid
setVar("accent-color", "#6366f1"); // ✗ Type error!
```

## Building a Type-Safe Query Builder

Here's where things get interesting. Let's build a query builder where column names are fully inferred from a schema:

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
const q = new QueryBuilder("users").select("name", "email"); // ✓ Only "id" | "name" | "email" allowed

// This would be a compile error:
const q2 = new QueryBuilder("users").select("title"); // ✗ "title" doesn't exist on "users"
```

## Mapped Types for Transformations

Mapped types let you transform every property in a type:

```typescript
// Make all properties optional and nullable
type Partial<T> = { [K in keyof T]?: T[K] | null };

// Make all properties readonly
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// Create a "patch" type where some fields are required
type Patch<T, Required extends keyof T> = Partial<T> & Pick<T, Required>;

type UserPatch = Patch<User, "id">;
// { id: number; name?: string | null; email?: string | null }
```

## Recursive Types

TypeScript supports recursive generic types, which enables representing deeply nested structures:

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

## Where to Draw the Line

Type-level programming is powerful, but it has costs:

- **Slower type checking** — complex types exponentially increase tsc time
- **Harder to debug** — error messages get cryptic fast
- **Steeper onboarding** — new team members may not follow the magic

My rule of thumb: use advanced type tricks **at library boundaries**, where the investment in type safety pays dividends across many call sites.

The compiler is your best teammate. Give it accurate type information, and it will catch more bugs than any test suite can.
