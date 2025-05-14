import { Module } from 'vuex';
import { RootState } from '../../types';
import { TodoState } from './types';
import { state } from './state';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

// TODOモジュール
const todoModule: Module<TodoState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default todoModule; 