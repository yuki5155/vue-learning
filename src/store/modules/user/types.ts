import { RootState } from '../../types';

// ユーザー情報の型定義
export interface User {
  id: number;
  name: string;
  email: string;
  isAuthenticated: boolean;
}

// ユーザーモジュールの状態の型定義
export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// モジュールの型定義をRootStateに統合
export interface State extends RootState {
  user: UserState;
} 