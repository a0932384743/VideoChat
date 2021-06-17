<template lang="pug">
  .row.items-center.justify-center
    .col-12
      .row.justify-center
        .text-h4.full-width.text-center.q-mb-md
          small Welcome back!
        .text-subtitle1.text-grey-8.q-mb-lg
          small Not registered?
            router-link.q-ml-xs.text-grey-8.text-hover-decoration-none(
              :to="{name: 'SignUp'}"
            )
              | Create an account
    .form-layer.col-12
      .form-body
        q-form.q-gutter-md(
          @keydown.enter.prevent="loginUser"
        )
          q-input(
            outlined
            dense
            lazy-rules
            ref="email"
            type="email"
            v-model="user.email"
            label="Enter work or school email"
            :rules="[rules.required, rules.email]"
          )
            template(
              v-slot:append
            )
              q-icon(
                name="close"
                @click="user.email = ''"
                class="cursor-pointer"
              )
          q-input.password-block(
            dense
            lazy-rules
            outlined
            ref="password"
            v-model="user.password"
            :type="isPwd ? 'password' : 'text'"
            label="Enter password"
            :rules="[rules.required]"
          )
            template(
              v-slot:append
            )
              q-icon(
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              )
          .forgot-password.text-subtitle1.no-margin.text-right
            small
              router-link.text-grey-8.text-hover-decoration-none(
                :to="{name: 'ForgotPassword'}"
              ) Forgot password
      .form-footer.q-mt-md
        q-btn.full-width(
          label="Sign in"
          no-caps
          color="grey-9"
          @click="loginUser"
        )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import validation from 'src/utils/validation';

@Component
export default class SignIn extends Vue {
  private isPwd = true;

  private formHasError = false;

  private user = {
    email: '',
    password: '',
  }

  private rules = {
    email: (value: string) => {
      const pattern = validation.patternEmail;
      return pattern.test(value) || 'Enter correct email';
    },
    required: (v: any) => !!v || 'This field is required',
  }

  loginUser() {
    (this.$refs.email as any).validate();
    (this.$refs.password as any).validate();

    if ((this.$refs.email as any).hasError || (this.$refs.password as any).hasError) {
      this.formHasError = true;
    } else {
      this.$q.loading.show();
      this.$store.dispatch('authModule/login', this.user)
        .then(() => {
          this.$q.notify({ icon: 'done', color: 'positive', message: 'Login successful' });
          this.$router.push({ name: 'StartMatching' });
        })
        .catch((error) => {
          this.$q.notify({ icon: 'report_problem', color: 'warning', message: error.message });
        })
        .finally(() => {
          this.$q.loading.hide();
        });
    }
  }
}
</script>
