<template>
    <li class="todo-item" :class="{ completed: todo.done }">
        <div class="todo-content">
            <input
                type="checkbox"
                :checked="todo.done"
                @change="handleToggle"
                class="todo-checkbox"
            />
            <span class="todo-title">{{ todo.title }}</span>
        </div>
        <button @click="handleRemove" class="remove-btn" title="Remove todo">✕</button>
    </li>
</template>

<script setup lang="ts">
import { useTodoStore, type Todo } from '@/stores/todoStore'

// Props with TypeScript interface
interface Props {
    todo: Todo
}

const props = defineProps<Props>()

// Get store actions
const { toggleTodo, removeTodo } = useTodoStore()

// Component methods
function handleToggle(): void {
    toggleTodo(props.todo.id)
}

function handleRemove(): void {
    removeTodo(props.todo.id)
}
</script>

<style scoped>
.todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    margin-bottom: 8px;
    background: white;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    transition: all 0.2s;
}

.todo-item:hover {
    border-color: #d1d5db;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-item.completed {
    background: #f9fafb;
    border-color: #d1d5db;
}

.todo-content {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 12px;
}

.todo-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.todo-title {
    font-size: 16px;
    color: #374151;
    transition: all 0.2s;
}

.todo-item.completed .todo-title {
    text-decoration: line-through;
    color: #9ca3af;
}

.remove-btn {
    background: none;
    border: none;
    color: #ef4444;
    font-size: 18px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s;
    opacity: 0.7;
}

.remove-btn:hover {
    background: #fef2f2;
    opacity: 1;
    transform: scale(1.1);
}

.todo-item:not(:hover) .remove-btn {
    opacity: 0.5;
}
</style>
