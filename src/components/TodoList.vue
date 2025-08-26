<template>
    <div class="todo-list">
        <div class="input-section">
            <input
                v-model="newTodoTitle"
                @keyup.enter="handleAddTodo"
                placeholder="What needs to be done?"
                class="new-todo-input"
            />
            <button @click="handleAddTodo" class="add-btn">Add Todo</button>
        </div>

        <div v-if="totalCount > 0" class="controls">
            <button
                @click="toggleAll"
                class="toggle-all-btn"
                :class="{ active: allCompleted }"
            >
                {{
                    allCompleted
                        ? 'Mark all as incomplete'
                        : 'Mark all as complete'
                }}
            </button>

            <button
                v-if="completedCount > 0"
                @click="clearCompleted"
                class="clear-completed-btn"
            >
                Clear completed ({{ completedCount }})
            </button>

            <button
                @click="reset"
                class="reset-btn"
                title="Clear everything and return to initial 3 todos"
            >
                Reset
            </button>
        </div>

        <ul v-if="allTodos.length > 0" class="todo-list-items">
            <TodoItem v-for="todo in allTodos" :key="todo.id" :todo="todo" />
        </ul>

        <div v-else class="empty-state">
            <p>No todos yet. Add one above to get started!</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import TodoItem from './TodoItem.vue'

// Get store functions and state
const {
    allTodos,
    totalCount,
    completedCount,
    allCompleted,
    addTodo,
    clearCompleted,
    toggleAll,
    reset,
} = useTodoStore()

// Local component state
const newTodoTitle = ref<string>('')

// Component methods
function handleAddTodo(): void {
    addTodo(newTodoTitle.value)
    newTodoTitle.value = ''
}
</script>

<style scoped>
.todo-list {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.input-section {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.new-todo-input {
    flex: 1;
    padding: 12px 16px;
    font-size: 16px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s;
}

.new-todo-input:focus {
    border-color: #4f46e5;
}

.add-btn {
    padding: 12px 24px;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.add-btn:hover {
    background: #4338ca;
}

.controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.toggle-all-btn,
.clear-completed-btn {
    padding: 8px 16px;
    border: 2px solid #e1e5e9;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
}

.toggle-all-btn:hover,
.clear-completed-btn:hover {
    border-color: #4f46e5;
    color: #4f46e5;
}

.toggle-all-btn.active {
    background: #4f46e5;
    color: white;
    border-color: #4f46e5;
}

.clear-completed-btn {
    border-color: #ef4444;
    color: #ef4444;
}

.clear-completed-btn:hover {
    background: #ef4444;
    color: white;
}

.reset-btn {
    padding: 8px 16px;
    border: 2px solid #6b7280;
    background: white;
    color: #6b7280;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
}

.reset-btn:hover {
    background: #6b7280;
    color: white;
}

.todo-list-items {
    list-style: none;
    padding: 0;
    margin: 0;
}

.empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #6b7280;
}

.empty-state p {
    font-size: 18px;
    margin: 0;
}
</style>
