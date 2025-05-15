import { ActionTree } from 'vuex';
import { TodoState } from './types';
import { RootState } from '../../types';
// what is Mutations?

import { MutationType } from './mutations';

// TODOモジュールのアクション
export const actions: ActionTree<TodoState, RootState> = {
  // 新しいTODOを追加
  async addTodo({ commit }, todoText: string) {
    if (todoText.trim()) {
      // ローディング状態を開始
      commit(MutationType.SET_LOADING, true);
      
      try {
        // 10秒のディレイを追加（ユーザー要件）
        await new Promise(resolve => setTimeout(resolve, 10000));
        
        // 遅延後にTODOを追加
        commit(MutationType.ADD_TODO, todoText);
      } catch (error) {
        // エラーがあれば処理
        commit(MutationType.SET_ERROR, 'TODOの追加に失敗しました。');
      } finally {
        // ローディング状態を終了
        commit(MutationType.SET_LOADING, false);
      }
    }
  },
  
  // TODOを削除
  removeTodo({ commit }, todoId: number) {
    commit(MutationType.REMOVE_TODO, todoId);
  },
  
  // TODOの完了状態を切り替え
  toggleTodo({ commit }, todoId: number) {
    commit(MutationType.TOGGLE_TODO, todoId);
  },
  
  // エラーをセット
  setError({ commit }, error: string | null) {
    commit(MutationType.SET_ERROR, error);
  },
  
  // モックデータをロード（本番環境では実際のAPIリクエストになる）
  async loadTodos({ commit }) {
    commit(MutationType.SET_LOADING, true);
    try {
      // 実際のAPIコールはここに実装
      // ダミーの遅延をシミュレート
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 今回は何もしない（初期状態を使用）
      
    } catch (error) {
      commit(MutationType.SET_ERROR, 'TODOリストの読み込みに失敗しました。');
    } finally {
      commit(MutationType.SET_LOADING, false);
    }
  }
}; 