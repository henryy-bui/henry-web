---
title: "React Performance the SMART Way: Composition over Memoization"
date: "2026-08-04"
description: "A deep dive into controlling React Fiber's reconciliation through architecture — Moving State Down, Composition, and Split Context Providers — instead of reaching for memoization."
tags: ["React", "Performance", "Architecture"]
---

In modern software engineering, performance is not simply the feeling of "smoothness". It is the result of systems thinking and tight control over React Fiber's reconciliation process. The biggest mistake engineers make is shipping band-aid fixes — such as overusing memoization — without a clear engineering target. To optimize for real, we start with the SMART model to drive the architectural strategy.

## 1. Defining Optimization Goals with the SMART Model

Optimizing without measurement data is an architectural failure. The SMART model keeps us out of the premature-optimization trap and focuses effort on the changes with the highest impact.

| SMART Factor | Engineering Metric for a Senior Engineer |
| --- | --- |
| **Specific** | Isolate the blast radius of state (state isolation). Eliminate the cascade of unnecessary reconciliations by restructuring the Render Tree instead of leaning on `useMemo` or `useCallback`. |
| **Measurable** | Bring Interaction to Next Paint (INP) down from 500ms to under 50ms; keep the Main Thread execution budget within 13.3ms (to absorb system overhead) in order to hold 60 FPS. |
| **Achievable** | Apply the established design patterns: Moving State Down and Children/Elements as Props, leveraging React Fiber's reference-comparison mechanism. |
| **Relevant** | Keep the source clean, reduce cache overhead, and improve UI responsiveness. |
| **Time-bound** | Complete Flamegraph analysis and hit the target metrics before the development freeze. |

To reach these numbers, a lead engineer must internalize the nature of the Fiber Architecture: React does not care whether props changed; it re-renders everything by default unless we deliberately intervene in Component Ownership.

## 2. How Re-renders Actually Work, and the Memoization Myth

**The truth about re-renders:** A common misconception is that "a component only re-renders when its props change". In reality, React works like this: when a component's state updates, React recursively re-renders all of its children, whether their props changed or not. That process builds a new Element tree (immutable objects describing the UI) and compares it against the old one (diffing) to update the real DOM.

**The cost of memoization:** Many developers treat `React.memo` as a silver bullet. But `React.memo` spends CPU on reference checks (`Object.is`) for every prop. For a simple component, the cost of those checks — plus the memory cost of holding a `useMemo` cache — is often higher than just re-rendering directly.

Following the principles from *Advanced React*, memoization is only warranted in three specific cases:

1. The component is genuinely expensive and is wrapped in `React.memo` with props that have stable references.
2. The value is used as a dependency for other hooks (such as `useEffect` or a downstream `useMemo`).
3. The value is passed down to already-memoized children, where an unstable reference would break the chain.

Instead of treating the symptom with a cache, we treat the root cause by isolating the scope of reconciliation.

## 3. Technique 1: Moving State Down

The core idea is "isolate the change". Placing state too high (at the Root, for example) means every tiny interaction forces the entire Fiber tree to be recomputed.

**The scenario:** Opening and closing a modal dialog lags the whole app because the `isOpen` state lives in `App`, triggering pointless reconciliation for its "slow component" siblings.

```jsx
// Before: state at the Root causes a wide re-render
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="layout">
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && <ModalDialog />}
      <VerySlowComponent /> {/* Forced to re-render for nothing */}
    </div>
  );
};

// After: state isolated inside its own sub-branch
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
      <VerySlowComponent /> {/* Untouched by the modal logic */}
    </div>
  );
};
```

**Assessment:** This technique creates a render boundary. When the state changes, React only has to walk the `ButtonWithModal` sub-branch, skipping the expensive siblings entirely.

## 4. Technique 2: Composition — Passing Components as Props

When state cannot move down because children need that data, we have to change the ownership of the expensive components instead.

React Elements (`<Component />`) are immutable objects. If an element is created in the parent and passed down to a child through props (such as `children`), its reference stays the same when the child updates its own internal state.

### Children as Props (Optimizing Scroll)

Here is how to bypass re-rendering a complex layout while scrolling:

```jsx
const ScrollableWithMovingBlock = ({ children }) => {
  const [position, setPosition] = useState(0);
  return (
    <div onScroll={(e) => setPosition(e.target.scrollTop)}>
      <MovingBlock position={position} />
      {/* React sees that 'children' is Object.is-identical, so it skips re-rendering this branch */}
      {children}
    </div>
  );
};

const App = () => {
  return (
    <ScrollableWithMovingBlock>
      <VerySlowComponent /> {/* Created in App, so its reference is stable */}
    </ScrollableWithMovingBlock>
  );
};
```

### Elements as Props (Complex Layouts)

The same idea extends to props like `leftColumn` or `rightColumn`, guaranteeing that static layout regions are never re-rendered by the layout shell's own state.

## 5. Technique 3: Split Context Providers

The "Context Gremlin" shows up when a small change in context (updating a single data field, say) re-renders every component calling `useContext`, whether or not they read that field. `useContext` bypasses any `React.memo` sitting in between.

**Anti-pattern:** Cramming both state and dispatch into a single object in the Provider's `value`. Every state change creates a new object, destroying reference stability.

**The senior solution:** Separate the static API (actions) from the dynamic data. Use `useReducer`, because `dispatch` is guaranteed to have a perfectly stable reference for the component's lifetime.

```jsx
const NavigationController = ({ children }) => {
  const [isNavExpanded, dispatch] = useReducer(reducer, false);

  // ApiContext holds action functions whose references never change
  const api = useMemo(() => ({
    open: () => dispatch({ type: 'open' }),
    close: () => dispatch({ type: 'close' })
  }), []); // dispatch is stable, so no dependencies are needed

  return (
    <ApiContext.Provider value={api}>
      <DataContext.Provider value={isNavExpanded}>
        {children}
      </DataContext.Provider>
    </ApiContext.Provider>
  );
};
```

With this structure, a component that only calls `api.open()` will never re-render when `isNavExpanded` changes.

## 6. Measurement and Validation (the Measurable Layer)

"It feels smoother" is subjective. A senior engineer needs quantitative numbers.

- **React Profiler:** Analyze the Flamegraph. If a component shows up yellow or orange (Ranked) with no logical reason to have changed, that is your refactoring target.
- **Chrome DevTools & INP:** Interaction to Next Paint is the single most important metric for interaction latency. The ideal threshold is under 50ms.
- **The 60 FPS budget (13.3ms):** A frame gives you 16.6ms, but the browser and the system always take a slice of it (browser overhead). To avoid jank, our code must not block the Main Thread for more than 13.3ms.

**Real-world results:**

- **Before optimization:** INP 500ms (Main Thread blocked by a cascade of redundant re-renders).
- **After optimization:** INP 50ms (thanks to Composition, React reconciles only the small branches that genuinely need it).

## 7. Conclusion and Checklist

Good architecture always beats memoization. Wrapping code in caching hooks only addresses the surface; controlling Component Ownership through Composition addresses the root of the performance problem.

An engineering checklist to run before reaching for `useMemo`/`React.memo`:

1. **Render Tree Ownership:** Have you tried moving state down to isolate the reconciliation scope?
2. **Immutable Elements:** Have you applied composition (children/elements as props) to keep element references stable?
3. **Context Splitting:** Have you split the Provider into dynamic data and static API?
4. **Metric-driven Validation:** Have you checked INP in Chrome DevTools and confirmed the execution budget stays under 13.3ms?

Remember: 60 FPS is a requirement for a high-quality product, not an option. Don't let a cache paper over bad architecture.
