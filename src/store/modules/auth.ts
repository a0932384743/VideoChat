import { Module } from 'vuex';
import { AuthInterface, AuthUserInterface } from '../../types/store/AuthInterface';
import { firebaseAuth } from 'boot/firebase';
import { StateInterface } from '../index';

const authModule: Module<AuthInterface, StateInterface> = {
  namespaced: true,

  state: {
    authenticated: false,
    guest: false,
  },

  getters: {
    isAuth(state) {
      return state.authenticated;
    },
    isGuest(state) {
      return state.guest;
    }
  },

  actions: {
    login: ({ commit, dispatch }, payload) => firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        const uid = response.user && response.user.uid;
        if (!uid) {
          throw new Error('User does not exist');
        }

        if (response.user && !response.user.emailVerified) {
          dispatch('logout');
          throw new Error('Please verify your email');
        }

        commit('authStateChanged', response.user);

        return dispatch('userModule/loginUser', { uid }, { root: true });
      }),

    resetPassword: () => {
      const { email } = firebaseAuth.currentUser as AuthUserInterface;
      return firebaseAuth.sendPasswordResetEmail(email);
    },

    verifyPasswordResetCode: ({}, { actionCode }) => firebaseAuth.verifyPasswordResetCode(actionCode),

    confirmPasswordReset: ({}, { actionCode, password }) => firebaseAuth.confirmPasswordReset(actionCode, password),

    applyActionCode: ({}, { actionCode }) => firebaseAuth.applyActionCode(actionCode),

    logout: ({ commit }) => firebaseAuth.signOut()
      .then(() => {
        commit('authStateChanged');
      }),

    loginAsGuest: ({ commit, dispatch }) => {
      return firebaseAuth.signInAnonymously()
        .then(async (res) => {
          const { user } = res;

          commit('setGuest');

          return user && user.uid
            ? await dispatch('userModule/createUser', { uid: user.uid }, { root: true })
            : res;
        });
    },

    register: ({ commit, dispatch }, payload) => firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        if (firebaseAuth.currentUser) {
          firebaseAuth.currentUser.sendEmailVerification();
        }
        const { displayName } = payload;
        const uid = response.user && response.user.uid;
        if (!uid) {
          throw new Error('User does not exist');
        }

        return dispatch('userModule/createUser', { uid, displayName }, { root: true });
      }),

    authToggle: ({ commit }, payload) => {
      commit('authToggle', payload);
    },

    setGuest: ({ commit }) => {
      commit('setGuest');
    },

    authStateChanged: ({ commit, dispatch }, user) => {
      commit('authStateChanged', user);
      return dispatch('userModule/authStateChanged', user, { root: true });
    },
  },

  mutations: {
    authToggle: (state: AuthInterface, payload) => {
      state.authenticated = payload;
      state.guest = false;
    },

    setGuest: (state: AuthInterface) => {
      state.authenticated = true;
      state.guest = true;
    },

    authStateChanged: (state: AuthInterface, user) => {
      state.authenticated = user && !user.isAnonymous && user.emailVerified;
      // TODO: To think. Guest need?
      state.guest = !user || user.isAnonymous || !user.emailVerified;
    },
  },
};

export default authModule;
