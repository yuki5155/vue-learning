import { Module } from 'vuex';
import { RootState } from '../../types';
import { UserState } from './types';
import { state } from './state';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

// ユーザーモジュール
const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default userModule; 