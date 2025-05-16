import { createStore } from 'vuex';
import { RootState } from './types';
import chatModule from './modules/chat';

export default createStore<RootState>({
  state: {
    // ルートの状態
  },
  modules: {
    chat: chatModule
  }
}); 