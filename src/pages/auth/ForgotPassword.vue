<template lang="pug">
  .row.items-center.justify-center
    .col-12
      .row.justify-center
        .text-h4.full-width.text-center.q-mb-md
          small Forgot password
    .form-layer.col-12
      .form-body
        q-form.q-gutter-md(
          @keydown.enter.prevent="sendEmail"
        )
          q-input.email-input(
            dense
            outlined
            lazy-rules
            ref="email"
            type="email"
            v-model="email"
            label="Enter work or school email"
            :rules="[ val => val && val.length > 0 || 'Please type email']"
          )
            template(
              v-slot:append
            )
              q-icon(
                name="close"
                @click="email = ''"
                class="cursor-pointer"
              )
      .form-footer.q-mt-md
        q-btn.full-width(
          label="Get reset link"
          no-caps
          color="grey-9"
          @click="sendEmail"
        )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { firebaseAuth } from 'boot/firebase';

@Component
export default class ForgotPassword extends Vue {
  email = '';

  sendEmail() {
    this.$q.loading.show();
    if (!this.email.length) {
      this.$q.notify({ icon: 'report_problem', color: 'warning', message: 'Please enter email' });
      this.$q.loading.hide();
    } else {
      firebaseAuth.sendPasswordResetEmail(this.email).then(() => {
        this.$q.loading.hide();
        this.$router.push('/');
        this.$q.notify({ icon: 'done', color: 'positive', message: 'Check your email' });
      }).catch((error) => {
        this.$q.loading.hide();
        this.$q.notify({ icon: 'report_problem', color: 'warning', message: error.message });
      });
    }
  }
}
</script>
