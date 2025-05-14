import { MutationTree } from 'vuex';
import { TodoState, TodoItem } from './types';

// ミューテーションタイプの定義
export enum MutationType {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR'
}

// TODOモジュールのミューテーション
export const mutations: MutationTree<TodoState> = {
  // 新しいTODOアイテムを追加
  [MutationType.ADD_TODO](state, todoText: string) {
    const newId = state.todos.length > 0 
      ? Math.max(...state.todos.map(t => t.id)) + 1 
      : 1;
    
    const newTodo: TodoItem = {
      id: newId,
      text: todoText,
      completed: false
    };
    
    state.todos.push(newTodo);
  },
  
  // TODOアイテムを削除
  [MutationType.REMOVE_TODO](state, todoId: number) {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
  },
  
  // TODOアイテムの完了状態を切り替え
  [MutationType.TOGGLE_TODO](state, todoId: number) {
    const todo = state.todos.find(todo => todo.id === todoId);
    if (todo) {
      todo.completed = !todo.completed;
    }
  },
  
  // ローディング状態をセット
  [MutationType.SET_LOADING](state, loading: boolean) {
    state.loading = loading;
  },
  
  // エラーメッセージをセット
  [MutationType.SET_ERROR](state, error: string | null) {
    state.error = error;
    state.loading = false;
  }
}; 