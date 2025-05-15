import { ActionTree } from 'vuex';
import { UserState, User } from './types';
import { RootState } from '../../types';
import { MutationType } from './mutations';

// ユーザーモジュールのアクション
export const actions: ActionTree<UserState, RootState> = {
  // ログインアクション
  async login({ commit }, credentials: { email: string; password: string }) {
    commit(MutationType.SET_LOADING, true);
    try {
      // 実際のAPIコールはここに実装
      // 今回はダミーデータを使用
      const user: User = {
        id: 1,
        name: 'テストユーザー',
        email: credentials.email,
        isAuthenticated: true
      };
      
      // ログイン成功
      commit(MutationType.SET_USER, user);
    } catch (error) {
      // ログイン失敗
      commit(MutationType.SET_ERROR, 'ログインに失敗しました。');
      throw error;
    } finally {
      commit(MutationType.SET_LOADING, false);
    }
  },
  
  // ログアウトアクション
  async logout({ commit }) {
    commit(MutationType.SET_LOADING, true);
    try {
      // 実際のAPIコールはここに実装
      
      // ログアウト処理
      commit(MutationType.CLEAR_USER);
    } catch (error) {
      commit(MutationType.SET_ERROR, 'ログアウトに失敗しました。');
      throw error;
    } finally {
      commit(MutationType.SET_LOADING, false);
    }
  }
}; 