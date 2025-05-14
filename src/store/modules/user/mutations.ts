import { MutationTree } from 'vuex';
import { UserState, User } from './types';

// ミューテーションタイプの定義
export enum MutationType {
  SET_USER = 'SET_USER',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  CLEAR_USER = 'CLEAR_USER'
}

// ユーザーモジュールのミューテーション
export const mutations: MutationTree<UserState> = {
  // ユーザー情報をセット
  [MutationType.SET_USER](state, user: User) {
    state.user = user;
    state.error = null;
  },
  
  // ローディング状態をセット
  [MutationType.SET_LOADING](state, loading: boolean) {
    state.loading = loading;
  },
  
  // エラーメッセージをセット
  [MutationType.SET_ERROR](state, error: string) {
    state.error = error;
    state.loading = false;
  },
  
  // ユーザー情報をクリア（ログアウト時など）
  [MutationType.CLEAR_USER](state) {
    state.user = null;
    state.error = null;
  }
}; 