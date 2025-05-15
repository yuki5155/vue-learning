<template>
  <li class="todo-item">
    <input 
      type="checkbox" 
      class="todo-checkbox" 
      :checked="completed"
      @change="$emit('toggle')"
    />
    <span class="todo-text" :class="{ completed }">
      {{ text }}
    </span>
    <button class="delete-button" @click="$emit('remove')">削除</button>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoItem',
  props: {
    text: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle', 'remove']
});
</script>

<style scoped>
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
</style> 