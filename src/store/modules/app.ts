import { Module } from 'vuex';
import { AppStateInterface } from 'src/types/store/AppStateInterface';
import { StateInterface } from '../index';

const appModule: Module<AppStateInterface, StateInterface> = {
  namespaced: true,

  state: {
    appName: 'Adjoined',
  },

  actions: {
  },

  mutations: {
  },
};

export default appModule;
