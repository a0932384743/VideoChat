<template lang="pug">
  .row.items-center.justify-center
    .col-12
      .row.justify-center
        .text-h4.full-width.text-center.q-mb-md
          small Sign up and get started
        .text-subtitle1.text-grey-8.q-mb-lg
          small Already registered?
            router-link.q-ml-xs.text-grey-8.text-hover-decoration-none(
              :to="{name: 'SignIn'}"
            )
              | Sign in
    .form-layer.col-12
      .form-body
        q-form.q-gutter-md(
          greedy
          ref="form"
          @keydown.enter.prevent="registerUser"
        )
          q-input.email-block(
            dense
            outlined
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
          q-input.email-block(
            dense
            outlined
            lazy-rules
            ref="name"
            type="text"
            v-model="user.displayName"
            label="Your Name"
            :rules="[rules.required]"
          )
            template(
              v-slot:append
            )
              q-icon(
                name="account_circle"
              )
          q-input.password-block(
            dense
            outlined
            lazy-rules
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
      .form-footer.q-mt-md
        q-btn.full-width(
          label="Sign up"
          no-caps
          color="grey-9"
          @click="registerUser"
        )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import validation from 'src/utils/validation';

@Component
export default class SignUp extends Vue {
  private isPwd = true;

  private user = {
    displayName: '',
    email: '',
    password: '',
  }

  mounted() {
    this.user.email = this.$store.state.userModule.email;
  }

  private rules = {
    email: (value: string) => {
      const pattern = validation.patternEmail;
      return pattern.test(value) || 'Enter correct email';
    },
    required: (v: any) => !!v || 'This field is required',
  }

  async registerUser() {
    const isValid = await (this.$refs.form as any).validate();

    if (!isValid) {
      return;
    }

    this.$q.loading.show();
    this.$store.dispatch('authModule/register', this.user)
      .then(() => {
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Thank you. An account registration request has been sent to your email.',
        });
        this.$router.push({ name: 'SignIn' });
      })
      .catch((error) => {
        this.$q.notify({ icon: 'report_problem', color: 'warning', message: error.message });
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }
}
</script>
