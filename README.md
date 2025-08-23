# Vue Data Store Pattern Demo (TypeScript)

A comprehensive demonstration of **Michael Thiessen's Data Store Pattern** using Vue 3, Composition API, and TypeScript with full type safety.

## 🏪 What is the Data Store Pattern?

The Data Store Pattern is a lightweight state management solution for Vue applications that provides:

- **Centralized State**: All shared state lives in one reactive object
- **Composable API**: Easy to use across components with `useTodoStore()`
- **Reactive Updates**: Automatic UI updates when state changes
- **No Prop Drilling**: Direct access to state from any component
- **Type Safety**: Full TypeScript support with compile-time error checking

## 🚀 Features Demonstrated

This demo showcases a complete todo application with:

- ✅ Add new todos
- ✅ Toggle todo completion status
- ✅ Remove individual todos
- ✅ Mark all todos as complete/incomplete
- ✅ Clear all completed todos
- ✅ Real-time statistics
- ✅ Responsive design

## 📁 Project Structure

```
src/
├── stores/
│   └── todoStore.ts          # Data Store Pattern implementation (TypeScript)
├── components/
│   ├── TodoList.vue          # Main todo list component (with TS)
│   └── TodoItem.vue          # Individual todo item (with TS)
├── App.vue                   # Root component (with TS)
├── main.ts                   # App entry point (TypeScript)
└── shims-vue.d.ts           # Vue TypeScript declarations
```

## 🔧 Key Implementation Details

### Store Structure (`src/stores/todoStore.ts`)

```typescript
import { reactive, computed, type ComputedRef } from 'vue'

// Type definitions
export interface Todo {
  id: number
  title: string
  done: boolean
}

interface TodoState {
  todos: Todo[]
  nextId: number
}

// Singleton reactive state
const state = reactive<TodoState>({
  todos: [],
  nextId: 1
})

// Composable function
export function useTodoStore() {
  // Actions (state mutations) - fully typed
  function addTodo(title: string): void { /* ... */ }
  function toggleTodo(id: number): void { /* ... */ }
  function removeTodo(id: number): void { /* ... */ }
  
  // Getters (computed properties) - with explicit types
  const allTodos: ComputedRef<Todo[]> = computed(() => state.todos)
  const remainingCount: ComputedRef<number> = computed(() => /* ... */)
  
  return {
    // Expose getters and actions
    allTodos,
    remainingCount,
    addTodo,
    toggleTodo,
    removeTodo
  }
}
```

### Component Usage

```vue
<script setup lang="ts">
import { useTodoStore, type Todo } from '@/stores/todoStore'

// Get what you need from the store - fully typed
const { allTodos, remainingCount, addTodo, toggleTodo } = useTodoStore()

// Props with TypeScript interface
interface Props {
  todo: Todo
}
const props = defineProps<Props>()
</script>
```

## 🎯 Pattern Benefits

1. **Simple**: No complex setup or boilerplate
2. **Reactive**: Built on Vue's reactivity system
3. **Flexible**: Easy to extend and modify
4. **Testable**: Pure functions for actions
5. **Performant**: Only re-renders what changed
6. **Scalable**: Works for small and large applications
7. **Type-Safe**: Full TypeScript support with IntelliSense and compile-time checks

## 🛠️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Type check:**
   ```bash
   npm run type-check
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🔄 Alternative Implementations

### With Pinia (Vue's official state management)
```bash
npm install pinia
```

### With Provide/Inject
```javascript
// In main.js
app.provide('todoStore', todoStore)

// In components
const todoStore = inject('todoStore')
```

## 📚 Learn More

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue Reactivity](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Michael Thiessen's Articles](https://michaelnthiessen.com/)
- [Pinia State Management](https://pinia.vuejs.org/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this code in your projects.
