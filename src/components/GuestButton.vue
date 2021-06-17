<template lang="pug">
  q-btn(
    v-if="!$store.state.authModule.guest"
    outline
    no-caps
    label="Continue as guest"
    @click="registerAsGuest()"
  )
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator';

@Component
export default class GuestButton extends Vue {
  @PropSync('closeForm') syncedAuthDialog: any

  registerAsGuest() {
    this.$q.loading.show();
    this.$store.dispatch('authModule/loginAsGuest').then((user) => {
      this.$store.dispatch('userModule/setUser', user);
      this.syncedAuthDialog();
      this.$q.loading.hide();
      this.$q.notify({
        icon: 'done',
        color: 'positive',
        message: 'You are signed in as a guest. Please create an account to have access to full functionality of the application.',
      });
    }).catch((error) => {
      this.$q.notify({ icon: 'report_problem', color: 'warning', message: error.message });
      this.$q.loading.hide();
    });
  }
}
</script>

<style scoped>

</style>
