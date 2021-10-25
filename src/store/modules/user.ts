import { Module } from 'vuex';
import { UserInterface, UserProfileInterface } from 'src/types/store/UserInterface';
import { FileUploadInterface } from 'src/types/store/FileUploadInterface';
import { firebaseStorage, firebaseAuth, firebaseDb, firestore } from 'boot/firebase';
import { StateInterface } from '../index';

const userModule: Module<UserInterface, StateInterface> = {
  namespaced: true,

  state: {
    uid: '',
    email: '',
    displayName: '',
    emailVerified: false,
    isPremium: false,
    photoURL: '',
    profile: {} as UserProfileInterface,
  },

  actions: {
    loginUser: ({ commit }, payload) => firebaseDb.collection('users')
      .doc(payload.uid)
      .get()
      .then((response) => {
        const user = {uid: payload.uid, ...response.data()};

        commit('setUser', user);
        return user;
      }),

    async authStateChanged({ commit, dispatch }, user) {
      if (!user) {
        return dispatch('unsetUser', null);
      }

      const refUser = await firebaseDb.collection('users')
        .doc(user.uid)
        .get();

      commit('setUser', { uid: user.uid, ...refUser.data(), ...user });
    },

    loadUserProfile({ commit, state }, uid) {
      return firebaseDb.collection(`users/${uid || state.uid}/details`)
          .doc(uid || state.uid)
          .get()
          .then((ref) => {
            const profile = ref.data();
            if (!uid) {
              commit('updateProfile', profile);
            }

            return profile
          });
    },

    onSetPremium({ commit, state }) {
      return firebaseDb.collection('users')
          .doc(state.uid)
          .update({isPremium: !state.isPremium})
          .then(() => {
            commit('setPremium', !state.isPremium);
            return state.isPremium;
          });
    },

    setUser: ({ commit }, payload) => {
      commit('setUser', payload);
      return true;
    },

    setGuestUser: ({ commit }, payload) => {
      commit('setGuestUser', payload);
    },

    unsetUser: ({ commit }) => {
      commit('unsetUser');
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setRating: ({ commit }, payload) => firebaseDb.collection('ratings').add(payload),

    updateProfile({ commit, dispatch, state }, userProfile) {
      const { user, profile } = userProfile;
      if (firebaseAuth.currentUser && user.displayName) {
        firebaseAuth.currentUser.updateProfile({ displayName: user.displayName });
      }

      dispatch('updateUser', { data: userProfile.user });

      return firebaseDb.collection('users')
        .doc(state.uid)
        .collection('details')
        .doc(state.uid)
        .set(profile)
        .then((res) => {
          console.log(res);
          commit('updateProfile', profile)
          commit('updateUserName', user.displayName)
        });
    },

    createUser: ({}, authUser) => firebaseDb.collection('users')
      .doc(authUser.uid)
      .set({
        displayName: authUser.displayName || '',
        isPremium: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
      }),

    updateUser: ({ commit, state }, payload) => firebaseDb.collection('users')
      .doc(payload.uid || state.uid)
      .update(payload.data),

    setToStateUserEmail({ commit }, email) {
      commit('setToStateUserEmail', email);
    },

    uploadAvatar: ({ commit, dispatch }, payload: FileUploadInterface) => firebaseStorage.ref(`users/${payload.uid}/`)
      .child(payload.file.name)
      .put(payload.file)
      .then((res) => {
        res.ref.getDownloadURL().then(async (imgUrl) => {
          commit('uploadAvatar', imgUrl);
          const data = { photoURL: imgUrl };

          if (firebaseAuth.currentUser) {
            await firebaseAuth.currentUser.updateProfile(data);
          }

          return dispatch('updateUser', { data });
        });
      }),
  },

  mutations: {
    updateUserName: (state, displayName) => {
      state.displayName = displayName;
    },

    setToStateUserEmail: (state, email) => {
      state.email = email;
    },

    uploadAvatar: (state, photoURL) => {
      state.photoURL = photoURL;
    },

    updateProfile: (state, profile) => {
      state.profile = profile;
    },

    setPremium: (state, isPremium) => {
      state.isPremium = isPremium;
    },

    setUser: (state: UserInterface, payload) => {
      state.uid = payload.uid || '';
      state.email = payload.email || '';
      state.displayName = payload.displayName || '';
      state.photoURL = payload.photoURL || '';
      state.emailVerified = payload.emailVerified || false;
      state.isPremium = payload.isPremium || false;
      state.profile = payload.profile || {};
    },

    setGuestUser: (state: UserInterface, payload) => {
      state.uid = payload.uid;
    },

    unsetUser: (state: UserInterface) => {
      state.uid = '';
      state.email = '';
      state.displayName = '';
      state.photoURL = '';
      state.emailVerified = false;
    },
  },
};

export default userModule;
