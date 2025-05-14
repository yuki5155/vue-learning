import { GetterTree } from 'vuex';
import { TodoState, TodoItem } from './types';
import { RootState } from '../../types';

// TODOモジュールのゲッター
export const getters: GetterTree<TodoState, RootState> = {
  // すべてのTODOアイテムを返す
  allTodos: (state): TodoItem[] => {
    return state.todos;
  },
  
  // 完了したTODOアイテムを返す
  completedTodos: (state): TodoItem[] => {
    return state.todos.filter(todo => todo.completed);
  },
  
  // 未完了のTODOアイテムを返す
  incompleteTodos: (state): TodoItem[] => {
    return state.todos.filter(todo => !todo.completed);
  },
  
  // TODOアイテムの総数を返す
  totalTodos: (state): number => {
    return state.todos.length;
  },
  
  // ローディング状態を返す
  isLoading: (state): boolean => {
    return state.loading;
  },
  
  // エラーメッセージを返す
  error: (state): string | null => {
    return state.error;
  }
}; 