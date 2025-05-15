<template>
  <div class="container">
    <h1>TODOリスト</h1>
    
    <!-- ローディング表示 -->
    <div v-if="isLoading" class="loading-indicator">
      <div class="spinner"></div>
      <p>処理中...</p>
    </div>
    
    <div class="todo-form">
      <input 
        type="text" 
        class="todo-input" 
        v-model="newTodo" 
        @keyup.enter="addTodo" 
        placeholder="新しいタスクを入力..."
        :disabled="isLoading"
      />
      <button class="add-button" @click="addTodo" :disabled="isLoading">追加</button>
    </div>
    
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <input 
          type="checkbox" 
          class="todo-checkbox" 
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
        />
        <span class="todo-text" :class="{ completed: todo.completed }">
          {{ todo.text }}
        </span>
        <button class="delete-button" @click="removeTodo(todo.id)">削除</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { MutationType } from './store/modules/products/mutations';

export default defineComponent({
  setup() {
    const store = useStore();
    const newTodo = ref('');

    // コンポーザブルでのストアの利用
    const todos = computed(() => store.getters['todo/allTodos']);
    
    // ローディング状態の取得
    const isLoading = computed(() => store.state.todo.loading);
    
    // 初期データのロード
    onMounted(() => {
      store.dispatch('todo/loadTodos');
    });

    // TODOの追加
    const addTodo = () => {
      if (newTodo.value.trim() && !isLoading.value) {
        store.dispatch('todo/addTodo', newTodo.value);
        newTodo.value = '';
      }
    };
    
    // TODOの削除
    const removeTodo = (id: number) => {
      store.dispatch('todo/removeTodo', id);
    };
    
    // TODOの完了状態の切り替え
    const toggleTodo = (id: number) => {
      store.dispatch('todo/toggleTodo', id);
    };

    return {
      newTodo,
      todos,
      isLoading,
      addTodo,
      removeTodo,
      toggleTodo
    };
  }
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.todo-form {
  display: flex;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.add-button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
}

.add-button:hover {
  background-color: #45a049;
}

.add-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-checkbox {
  margin-right: 10px;
}

.todo-text {
  flex: 1;
  font-size: 16px;
}

.todo-text.completed {
  text-decoration: line-through;
  color: #888;
}

.delete-button {
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.delete-button:hover {
  background-color: #d32f2f;
}

/* ローディングインジケーターのスタイル */
.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #4caf50;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 