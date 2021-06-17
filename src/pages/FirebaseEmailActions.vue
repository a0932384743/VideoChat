<template lang="pug">
  error404(
    v-if="isError"
  )
  .row.justify-center.full-width.full-height(
    v-else
  )
    .row.items-center.justify-center.full-width(
      v-if="isLoad"
    )
      .flex.q-mb-lg.justify-center
        .text-center.full-width
          router-link.text-decoration-none(
            :to="{name: 'Welcome'}"
          )
            .logo-site.text-h4.no-margin
              q-img(
                :src="require('../assets/logo.svg')"
                width="60px"
                height="40px"
              )
              | Adjoined
        reset-password(
          v-if="isResetPassword && email"
          :email="email"
          @reset="onResetPassword"
        )
        .default-action.text-center(
          v-else
        )
          .message {{ errorMessage }}
          router-link(
            :to="{ name: 'Welcome' }"
          ) Go to Home
</template>

<script lang="ts">
import {
  Vue, Component,
} from 'vue-property-decorator';
import ResetPassword from 'pages/auth/ResetPassword.vue';
import Error404 from './Error404.vue';

@Component({
  components: {
    Error404,
    ResetPassword,
  },
})
export default class FirebaseEmailActions extends Vue {
  private isError = false;

  private errorMessage = '';

  private email = '';

  private resetPassword = 'resetPassword';

  private recoverEmail = 'recoverEmail';

  private verifyEmail = 'verifyEmail';

  private isLoad = false;

  mounted() {
    const modes = [this.resetPassword, this.recoverEmail, this.verifyEmail];
    this.isError = !this.queryMode || !modes.includes(this.queryMode);
    this.switchAction();
  }

  switchAction() {
    switch (this.queryMode) {
      case this.resetPassword:
        // Display reset password handler and UI.
        this.handleResetPassword();
        break;
      case this.recoverEmail:
        // Display email recovery handler and UI.
        this.handleRecoverEmail();
        break;
      case this.verifyEmail:
        // Display email verification handler and UI.
        this.handleVerifyEmail();
        break;
      default:
        // Error: invalid mode.
        this.isError = true;
    }
  }

  handleResetPassword() {
    this.$store.dispatch('authModule/verifyPasswordResetCode', {
      actionCode: this.queryActionCode,
      continueUrl: this.queryContinueUrl,
      lang: this.queryLang,
    })
      .then((email) => {
        this.email = email;
        this.isLoad = true;
      })
      .catch((error) => {
        this.$q.notify({ icon: 'report_problem', color: 'warning', message: error.message });
        this.errorMessage = error.message;
      });
  }

  handleVerifyEmail() {
    this.$q.loading.show();
    this.$store.dispatch('authModule/applyActionCode', {
      actionCode: this.queryActionCode,
      continueUrl: this.queryContinueUrl,
      lang: this.queryLang,
    })
      .then(() => {
        this.$q.notify({ icon: 'done', color: 'positive', message: 'Thank you! Your email was verified' });
        this.isLoad = true;
        if (this.queryContinueUrl) {
          window.location.href = this.queryContinueUrl;
          return;
        }
        this.$router.push({ name: 'SignIn' });
      })
      .catch((error) => {
        this.$q.notify({ icon: 'report_problem', color: 'warning', message: error.message });
        this.errorMessage = error.message;
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  onResetPassword(password: string) {
    this.$q.loading.show();
    this.$store.dispatch('authModule/confirmPasswordReset', {
      password,
      actionCode: this.queryActionCode,
    })
      .then(async () => {
        await this.$store.dispatch('authModule/logout');

        this.$q.notify({ icon: 'done', color: 'positive', message: 'Password Changed' });
        if (this.queryContinueUrl) {
          window.location.href = this.queryContinueUrl;
          return;
        }
        await this.$router.push({ name: 'SignIn' });
      })
      .catch((error) => {
        this.$q.notify({ icon: 'report_problem', color: 'warning', message: error.message });
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  handleRecoverEmail() {
    // NOTICE: Need writing logic https://firebase.google.com/docs/auth/custom-email-handler
  }

  get queryLang(): string {
    return (this.$route.query && this.$route.query.lang as string) || '';
  }

  get queryContinueUrl(): string {
    return (this.$route.query && this.$route.query.continueUrl as string) || '';
  }

  get queryActionCode(): string {
    return (this.$route.query && this.$route.query.oobCode as string) || '';
  }

  get queryMode(): string {
    return (this.$route.query && this.$route.query.mode as string) || '';
  }

  get isResetPassword(): boolean {
    return this.resetPassword === this.queryMode;
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .form-layer {
    max-width: 320px;
  }
</style>
