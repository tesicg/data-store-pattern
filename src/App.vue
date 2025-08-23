<template>
    <div id="app">
        <header class="app-header">
            <h1>Vue Data Store Pattern Demo (TypeScript)</h1>
            <p class="subtitle">
                A comprehensive example of Michael Thiessen's Data Store Pattern with full type
                safety
            </p>
        </header>

        <main class="app-main">
            <TodoList />
        </main>

        <footer class="app-footer">
            <div class="stats">
                <div class="stat-item">
                    <span class="stat-number">{{ totalCount }}</span>
                    <span class="stat-label">Total</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">{{ remainingCount }}</span>
                    <span class="stat-label">Remaining</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">{{ completedCount }}</span>
                    <span class="stat-label">Completed</span>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import { useTodoStore } from '@/stores/todoStore'

// Access store state for the footer stats
const { totalCount, remainingCount, completedCount } = useTodoStore()
</script>

<style>
/* Global styles */
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family:
        -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.app-header {
    text-align: center;
    padding: 40px 20px;
    color: white;
}

.app-header h1 {
    font-size: 2.5rem;
    margin: 0 0 10px 0;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
    font-size: 1.2rem;
    margin: 0;
    opacity: 0.9;
    font-weight: 300;
}

.app-main {
    flex: 1;
    padding: 20px;
    background: white;
    margin: 0 20px;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}

.app-footer {
    background: white;
    padding: 30px 20px;
    margin: 0 20px;
    border-radius: 0 0 12px 12px;
    border-top: 2px solid #f3f4f6;
}

.stats {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

.stat-item {
    text-align: center;
}

.stat-number {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: #4f46e5;
    line-height: 1;
}

.stat-label {
    display: block;
    font-size: 0.9rem;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 4px;
}

@media (max-width: 768px) {
    .app-header h1 {
        font-size: 2rem;
    }

    .subtitle {
        font-size: 1rem;
    }

    .app-main,
    .app-footer {
        margin: 0 10px;
    }

    .stats {
        gap: 20px;
    }
}
</style>
