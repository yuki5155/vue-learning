<template>
  <div class="container">
    <h1>TODOリスト</h1>
    <div class="todo-form">
      <input 
        type="text" 
        class="todo-input" 
        v-model="newTodo" 
        @keyup.enter="addTodo" 
        placeholder="新しいタスクを入力..."
      />
      <button class="add-button" @click="addTodo">追加</button>
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
    
    // 初期データのロード
    onMounted(() => {
      store.dispatch('todo/loadTodos');
    });

    // TODOの追加
    const addTodo = () => {
      if (newTodo.value.trim()) {
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
      addTodo,
      removeTodo,
      toggleTodo
    };
  }
});
</script> 