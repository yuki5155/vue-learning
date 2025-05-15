<template>
  <div class="todo-form">
    <input 
      type="text" 
      class="todo-input" 
      v-model="todoText" 
      @keydown.enter="(event) => !event.isComposing && handleSubmit()"
      placeholder="新しいタスクを入力..."
      :disabled="isLoading"
    />
    <button class="add-button" @click="handleSubmit" :disabled="isLoading">追加</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TodoForm',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['add-todo'],
  setup(props, { emit }) {
    const todoText = ref('');

    const handleSubmit = () => {
      if (todoText.value.trim() && !props.isLoading) {
        emit('add-todo', todoText.value);
        todoText.value = '';
      }
    };

    return {
      todoText,
      handleSubmit
    };
  }
});
</script>

<style scoped>
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
</style> 