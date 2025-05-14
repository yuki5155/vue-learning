import { ActionTree } from 'vuex';
import { TodoState } from './types';
import { RootState } from '../../types';
import { MutationType } from './mutations';

// TODOモジュールのアクション
export const actions: ActionTree<TodoState, RootState> = {
  // 新しいTODOを追加
  addTodo({ commit }, todoText: string) {
    if (todoText.trim()) {
      commit(MutationType.ADD_TODO, todoText);
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