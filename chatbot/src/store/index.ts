import { createStore } from 'vuex';
import { RootState } from './types';
import chatModule from './modules/chat';
import authModule from './modules/auth';

export default createStore<RootState>({
  state: {
    // ルートの状態
  },
  modules: {
    chat: chatModule,
    auth: authModule
  }
}); 