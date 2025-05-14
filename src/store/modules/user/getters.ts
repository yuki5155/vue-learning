import { GetterTree } from 'vuex';
import { UserState } from './types';
import { RootState } from '../../types';

// ユーザーモジュールのゲッター
export const getters: GetterTree<UserState, RootState> = {
  // ユーザーが認証済みかどうかを返す
  isAuthenticated: (state) => {
    return !!state.user && state.user.isAuthenticated;
  },
  
  // ユーザー情報を返す
  currentUser: (state) => {
    return state.user;
  },
  
  // ローディング状態を返す
  isLoading: (state) => {
    return state.loading;
  },
  
  // エラーメッセージを返す
  error: (state) => {
    return state.error;
  }
}; 