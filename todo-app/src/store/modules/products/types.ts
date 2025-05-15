import { RootState } from '../../types';

// TODOアイテムの型定義
export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

// TODOモジュールの状態の型定義
export interface TodoState {
  todos: TodoItem[];
  loading: boolean;
  error: string | null;
}

// モジュールの型定義をRootStateに統合
export interface State extends RootState {
  todo: TodoState;
} 