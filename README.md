# Vue Data Store Pattern Demo (TypeScript)

A comprehensive demonstration of **Michael Thiessen's Data Store Pattern** using Vue 3, Composition API, and TypeScript with full type safety.

## What is the Data Store Pattern?

The Data Store Pattern is a lightweight state management solution for Vue applications that provides:

- **Centralized State**: All shared state lives in one reactive object
- **Composable API**: Easy to use across components with `useTodoStore()`
- **Reactive Updates**: Automatic UI updates when state changes
- **No Prop Drilling**: Direct access to state from any component
- **Type Safety**: Full TypeScript support with compile-time error checking

Michael Thiessen's Data Store Pattern Implementation with TypeScript

This demonstrates the core principles:

1. Single reactive state object (singleton)
2. Composable function that exposes getters and actions
3. All state mutations happen through store actions
4. Components never directly mutate the state
5. Full type safety with TypeScript

## Getting Started

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Start development server:**

    ```bash
    npm run dev
    ```

3. **Build for production:**
    ```bash
    npm run build
    ```
