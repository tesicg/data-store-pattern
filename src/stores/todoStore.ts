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

// Singleton reactive state object
const state = reactive<TodoState>({
    todos: [
        { id: 1, title: 'Learn Vue 3 Composition API', done: true },
        { id: 2, title: 'Understand Data Store Pattern', done: false },
        { id: 3, title: 'Build awesome TypeScript apps', done: false },
    ],
    nextId: 4,
})

/**
 * Composable that exposes the todo store
 * This can be imported and used in any component
 */
export function useTodoStore() {
    // Actions - these are the only way to mutate state
    function addTodo(title: string): void {
        const text = title?.trim()
        if (!text) {
            console.warn('[TodoStore] Cannot add empty todo')
            return
        }

        state.todos.push({
            id: state.nextId++,
            title: text,
            done: false,
        })
    }

    function toggleTodo(id: number): void {
        const todo = state.todos.find((t) => t.id === id)
        if (todo) {
            todo.done = !todo.done
        } else {
            console.warn(`[TodoStore] Todo with id ${id} not found`)
        }
    }

    function removeTodo(id: number): void {
        const index = state.todos.findIndex((t) => t.id === id)
        if (index !== -1) {
            state.todos.splice(index, 1)
        } else {
            console.warn(`[TodoStore] Todo with id ${id} not found`)
        }
    }

    function clearCompleted(): void {
        state.todos = state.todos.filter((todo) => !todo.done)
    }

    function toggleAll(): void {
        const allDone = state.todos.every((todo) => todo.done)
        state.todos.forEach((todo) => {
            todo.done = !allDone
        })
    }

    // Getters - computed properties for derived state
    const allTodos: ComputedRef<Todo[]> = computed(() => state.todos)
    const activeTodos: ComputedRef<Todo[]> = computed(() =>
        state.todos.filter((todo) => !todo.done),
    )
    const completedTodos: ComputedRef<Todo[]> = computed(() =>
        state.todos.filter((todo) => todo.done),
    )
    const remainingCount: ComputedRef<number> = computed(() => activeTodos.value.length)
    const completedCount: ComputedRef<number> = computed(() => completedTodos.value.length)
    const totalCount: ComputedRef<number> = computed(() => state.todos.length)
    const allCompleted: ComputedRef<boolean> = computed(
        () => state.todos.length > 0 && remainingCount.value === 0,
    )

    // Return the public API
    return {
        // Getters
        allTodos,
        activeTodos,
        completedTodos,
        remainingCount,
        completedCount,
        totalCount,
        allCompleted,

        // Actions
        addTodo,
        toggleTodo,
        removeTodo,
        clearCompleted,
        toggleAll,
    }
}
