import { TodoState } from './types';

// TODOモジュールの初期状態
export const state: TodoState = {
  todos: [
    { id: 1, text: 'Vueの基本を学ぶ', completed: true },
    { id: 2, text: 'TODOアプリを作成する', completed: false },
    { id: 3, text: 'コンポーネントについて学ぶ', completed: false }
  ],
  loading: false,
  error: null
}; 