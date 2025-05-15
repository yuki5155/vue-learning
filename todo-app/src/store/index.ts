import { createStore } from 'vuex';
import { RootState } from './types';
import userModule from './modules/user';
import todoModule from './modules/todo';

// ルートストアの作成
const store = createStore<RootState>({
  // ルートステートの初期値（必要があれば追加）
  state: {},
  
  // モジュールの統合
  modules: {
    user: userModule,
    todo: todoModule
  }
});

export default store; 