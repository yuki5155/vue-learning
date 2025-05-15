<template>
  <div class="container">
    <h1>TODOリスト</h1>
    
    <!-- ローディング表示 -->
    <LoadingSpinner v-if="isLoading" />
    
    <TodoForm 
      :is-loading="isLoading" 
      @add-todo="addTodo" 
    />
    
    <ul class="todo-list">
      <TodoItem 
        v-for="todo in todos" 
        :key="todo.id" 
        :text="todo.text" 
        :completed="todo.completed"
        @toggle="toggleTodo(todo.id)"
        @remove="removeTodo(todo.id)"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import TodoItem from '@/components/TodoItem.vue';
import TodoForm from '@/components/TodoForm.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default defineComponent({
  components: {
    TodoItem,
    TodoForm,
    LoadingSpinner
  },
  setup() {
    const store = useStore();
    
    // コンポーザブルでのストアの利用
    const todos = computed(() => store.getters['todo/allTodos']);
    
    // ローディング状態の取得
    const isLoading = computed(() => store.state.todo.loading);
    
    // 初期データのロード
    onMounted(() => {
      store.dispatch('todo/loadTodos');
    });

    // TODOの追加
    const addTodo = (text: string) => {
      if (text.trim() && !isLoading.value) {
        store.dispatch('todo/addTodo', text);
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

.todo-list {
  list-style: none;
  padding: 0;
}
</style> 