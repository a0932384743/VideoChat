import Vue from 'vue';
import Vuex from 'vuex';

export interface StateInterface {
  appModule: unknown;
  authModule: unknown;
  userModule: unknown;
}
import appModule from './modules/app';
import authModule from './modules/auth';
import userModule from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store(
  {
    strict: true,
    modules: {
      appModule,
      authModule,
      userModule,
    },
  },
);
