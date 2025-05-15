import { Module } from 'vuex';
import { RootState } from '../../../store/types';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
}

const todoModule: Module<TodoState, RootState> = {
  namespaced: true,
  
  state: {
    todos: [],
    loading: false
  },
  
  getters: {
    allTodos: (state: TodoState) => state.todos,
    completedTodos: (state: TodoState) => state.todos.filter((todo: Todo) => todo.completed),
    pendingTodos: (state: TodoState) => state.todos.filter((todo: Todo) => !todo.completed)
  },
  
  mutations: {
    setLoading(state: TodoState, loading: boolean) {
      state.loading = loading;
    },
    
    setTodos(state: TodoState, todos: Todo[]) {
      state.todos = todos;
    },
    
    addTodo(state: TodoState, text: string) {
      const newId = state.todos.length > 0 
        ? Math.max(...state.todos.map(t => t.id)) + 1 
        : 1;
        
      state.todos.push({
        id: newId,
        text,
        completed: false
      });
    },
    
    removeTodo(state: TodoState, id: number) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    },
    
    toggleTodo(state: TodoState, id: number) {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  },
  
  actions: {
    // Load Todos from localStorage or API
    loadTodos({ commit }) {
      commit('setLoading', true);
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        try {
          // Try to get todos from localStorage
          const savedTodos = localStorage.getItem('todos');
          if (savedTodos) {
            commit('setTodos', JSON.parse(savedTodos));
          } else {
            // Sample initial todos
            commit('setTodos', [
              { id: 1, text: 'Vue.jsの学習', completed: false },
              { id: 2, text: 'Vuexの理解', completed: false },
              { id: 3, text: 'Vue Routerの設定', completed: true }
            ]);
          }
        } catch (error) {
          console.error('Error loading todos:', error);
          // Set empty array in case of error
          commit('setTodos', []);
        } finally {
          commit('setLoading', false);
        }
      }, 500);
    },
    
    // Save todos to localStorage
    saveTodos({ state }) {
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    
    // Add a new todo
    addTodo({ commit, dispatch }, text: string) {
      commit('setLoading', true);
      
      // Simulate API delay
      setTimeout(() => {
        commit('addTodo', text);
        dispatch('saveTodos');
        commit('setLoading', false);
      }, 300);
    },
    
    // Remove a todo
    removeTodo({ commit, dispatch }, id: number) {
      commit('setLoading', true);
      
      // Simulate API delay
      setTimeout(() => {
        commit('removeTodo', id);
        dispatch('saveTodos');
        commit('setLoading', false);
      }, 300);
    },
    
    // Toggle todo completed status
    toggleTodo({ commit, dispatch }, id: number) {
      commit('toggleTodo', id);
      dispatch('saveTodos');
    }
  }
};

export default todoModule; 