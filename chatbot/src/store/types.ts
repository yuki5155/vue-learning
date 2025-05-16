import { AuthState } from './modules/auth';

export interface RootState {
  // ルートの状態型定義
  auth?: AuthState;
} 