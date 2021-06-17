<template lang="pug">
  .row.items-center.justify-center
    .col-12
      .row.justify-center
        .text-h4.full-width.text-center
          small Reset password
        .text-center.q-pt-sm(
          v-if="email"
        ) {{ email }}
    .form-layer.col-12.q-mt-md
      .form-body
        q-form.q-gutter-md(
          ref="form"
          @keydown.enter.prevent="onReset"
        )
          q-input.password-block(
            dense
            outlined
            lazy-rules
            v-model="password"
            label="Enter password"
            :type="isPwd ? 'password' : 'text'"
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
          label="Reset"
          no-caps
          color="grey-9"
          @click="onReset"
        )
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

@Component
export default class ResetPassword extends Vue {
  @Prop({ default: '' }) private email!: string;

  private isPwd = true;

  private password = '';

  private rules = {
    required: (v: any) => !!v || 'This field is required',
  }

  async onReset() {
    const isValid = await (this.$refs.form as any).validate();

    if (!isValid) {
      return;
    }

    this.$emit('reset', this.password);
  }
}
</script>
