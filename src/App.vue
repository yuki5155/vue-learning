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
      <li v-for="(todo, index) in todos" :key="index" class="todo-item">
        <input 
          type="checkbox" 
          class="todo-checkbox" 
          v-model="todo.completed"
        />
        <span class="todo-text" :class="{ completed: todo.completed }">
          {{ todo.text }}
        </span>
        <button class="delete-button" @click="removeTodo(index)">削除</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Todo {
  text: string;
  completed: boolean;
}

export default defineComponent({
  data() {
    return {
      newTodo: '',
      todos: [
        { text: 'Vueの基本を学ぶ', completed: true },
        { text: 'TODOアプリを作成する', completed: false },
        { text: 'コンポーネントについて学ぶ', completed: false }
      ] as Todo[]
    };
  },
  methods: {
    addTodo(): void {
      if (this.newTodo.trim()) {
        this.todos.push({
          text: this.newTodo,
          completed: false
        });
        this.newTodo = '';
      }
    },
    removeTodo(index: number): void {
      this.todos.splice(index, 1);
    }
  }
});
</script> 