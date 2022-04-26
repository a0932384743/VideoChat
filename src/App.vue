<template>
  <div id="q-app" v-if="isLoading">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { firebaseAuth } from 'boot/firebase';

@Component
export default class App extends Vue {
  private isLoading = false

  mounted() {
    firebaseAuth.onAuthStateChanged((user) => {
      this.$store.dispatch('authModule/authStateChanged', user)
        .then(() => {
          if (!this.$store.state.authModule.authenticated && this.$route.meta.ifAuthenticated) {
            this.$router.push({ name: 'SignIn' });
          }
          this.isLoading = true;
        });
    });
  }
}
</script>
