<template lang="pug">
  .credentials
    .section
      q-card(
        flat
      )
        q-card-section
          .text-h6 Email
        q-card-section.q-pt-none
          .text-body1.email {{ $store.state.userModule.email }}

      q-card(
        flat
      )
        q-card-section
          .text-h6 Password
        q-card-section.q-pt-none
          q-btn.q-px-md.select-img.cursor-pointer(
            label="Reset Password"
            no-caps
            outline
            size=".9rem"
            @click="onResetPassword"
          )

      q-card(
        flat
      )
        q-card-section
          .text-h6 Membership
        q-card-section.q-pt-none
          .flex.items-center
            .member-type.q-mr-xl {{ isPremiumAccount ? 'Premium Member' : 'Free Member' }}

            q-btn.q-px-md.select-img.cursor-pointer(
              :label="getLabelMembership"
              no-caps
              outline
              size=".9rem"
              @click="onGetPremium"
            )
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator';

@Component
export default class AccountCredentials extends Vue {
  @PropSync('accountDialog') syncedAccountDialog: any

  onResetPassword() {
    this.$q.dialog({
      title: 'Confirm',
      message: 'Warning! You will be signed out of the application. Are you sure you want to reset your password?',
      cancel: true,
      persistent: true,
    }).onOk(() => {
      this.$store.dispatch('authModule/resetPassword')
        .then(() => {
          this.$store.dispatch('authModule/logout')
            .finally(() => {
              this.$q.notify({ icon: 'done', color: 'positive', message: 'A password reset email has been sent to you' });
              this.$router.push({ name: 'SignIn' });
            });
        })
        .catch((error) => {
          this.$q.notify({ icon: 'report_problem', color: 'warning', message: error.message });
        });
    });
  }

  onGetPremium() {
    this.$store.dispatch('userModule/onSetPremium');
  }

  get isPremiumAccount(): boolean {
    return this.$store.state.userModule.isPremium as boolean;
  }

  get getLabelMembership(): string {
    return this.isPremiumAccount ? 'Cancel Membership' : 'Get Premium Membership';
  }
}
</script>

<style lang="scss" scoped>
.text-h6 {
  font-size: 1.15rem;
}

.email, button, .member-type {
  color: $timer-color;
}
</style>
