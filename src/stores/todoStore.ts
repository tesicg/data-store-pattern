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

// Default todos for initial state and reset functionality
const DEFAULT_TODOS: Todo[] = [
    { id: 1, title: 'Learn Vue 3 Composition API', done: true },
    { id: 2, title: 'Understand Data Store Pattern', done: false },
    { id: 3, title: 'Build awesome TypeScript apps', done: false },
]

const DEFAULT_STATE: TodoState = {
    todos: DEFAULT_TODOS.map((t) => ({ ...t })), // clone to avoid mutations
    nextId: DEFAULT_TODOS.length + 1,
}

// Singleton reactive state object
const state = reactive<TodoState>({
    todos: DEFAULT_STATE.todos.slice(),
    nextId: DEFAULT_STATE.nextId,
})

const STORAGE_KEY = 'vue_todo_data'

// Load state from localStorage
function loadState(): void {
    if (typeof window === 'undefined') return

    const json = localStorage.getItem(STORAGE_KEY)
    if (!json) return

    try {
        const parsed = JSON.parse(json)
        if (parsed && Array.isArray(parsed.todos) && typeof parsed.nextId === 'number') {
            // Sanitize each todo to ensure type safety
            state.todos = parsed.todos.map((t: any) => ({
                id: Number(t.id),
                title: String(t.title),
                done: Boolean(t.done),
            }))
            state.nextId = parsed.nextId
        }
    } catch (err) {
        console.error('[TodoStore] Failed to parse localStorage JSON:', err)
    }
}

// Save current state to localStorage
function saveState(): void {
    if (typeof window === 'undefined') return

    try {
        const toSave = {
            todos: state.todos,
            nextId: state.nextId,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch (err) {
        console.error('[TodoStore] Failed to save to localStorage:', err)
    }
}

// Load state on module initialization
loadState()

// Composable that exposes the todo store
// This can be imported and used in any component
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
        saveState()
    }

    function toggleTodo(id: number): void {
        const todo = state.todos.find((t) => t.id === id)
        if (todo) {
            todo.done = !todo.done
            saveState()
        } else {
            console.warn(`[TodoStore] Todo with id ${id} not found`)
        }
    }

    function removeTodo(id: number): void {
        const index = state.todos.findIndex((t) => t.id === id)
        if (index !== -1) {
            state.todos.splice(index, 1)
            saveState()
        } else {
            console.warn(`[TodoStore] Todo with id ${id} not found`)
        }
    }

    function clearCompleted(): void {
        state.todos = state.todos.filter((todo) => !todo.done)
        saveState()
    }

    function toggleAll(): void {
        const allDone = state.todos.every((todo) => todo.done)
        state.todos.forEach((todo) => {
            todo.done = !allDone
        })
        saveState()
    }

    function reset(): void {
        state.todos = DEFAULT_STATE.todos.map((t) => ({ ...t }))
        state.nextId = DEFAULT_STATE.nextId
        saveState()
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
        reset,
    }
}
