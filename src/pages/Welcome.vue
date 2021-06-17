<template lang="pug">
  .q-page.full-height
    .row
      .col
        h1.logo-site.text-h5.no-margin
          q-img(
            :src="require('../assets/logo.svg')"
            width="67px"
            height="40px"
          )
          | Adjoined
      .col.text-right.login.flex.justify-end.q-pr-xl(
        v-if="!isAuth"
      )
        router-link.btn-login.flex.flex-center.text-h5.text-hover-decoration-underline.text-decoration-none(
          :to="{name: 'SignIn'}"
        )
          small Sign in
    .row.reverse-wrap.q-mx-auto#welcome-page-content
      .introduction
        transition(
          name="slide-down"
        )
          .row(
            v-if="isLoading"
          )
            h2 Virtual coworking space for your community
            div.text-body-custom.q-mb-lg Working remotely can feel isolating at times.
              |  Adjoined creates a shared space for people to work together and stay connected.

            q-field.input-email(
              hide-bottom-space
              borderless
              dense
            )
              template(
                v-slot:control
              )
                q-input.full-width(
                  v-model="email"
                  ref="email"
                  type="email"
                  size="14px"
                  outlined
                  dense
                  :readonly="$store.state.authModule.authenticated"
                  label="Enter work or school email"
                  :rules="[rules.required, rules.email]"
                  @keydown.enter.prevent="saveEmailAndGo"
                  @blur="$refs.email.resetValidation()"
                )
              template(
                v-slot:after
              )
                q-field(
                  style="padding-top: 10px"
                  borderless
                )
                  q-btn.q-px-lg(
                    size="14px"
                    dense
                    flat
                    no-caps
                    style="background: #5f5f5f"
                    color="#5f5f5f"
                    text-color="white"
                    label="Get Early Access"
                    @click="saveEmailAndGo"
                  )
      .demonstration
        transition(
          name="slide-up"
        )
          .full-width(
            v-if="isLoading"
            :class="{'justify-center text-center': $q.screen.sm}"
          )
            q-img(
              :src="require('../assets/welcome/room.png')"
              width="640px"
            )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import validation from 'src/utils/validation';

@Component
export default class Welcome extends Vue {
  private email = '';

  private formHasError = false;

  private isLoading = false;

  private rules = {
    email: (value: string) => {
      const pattern = validation.patternEmail;
      return pattern.test(value) || 'Enter correct email';
    },
    required: (v: any) => !!v || 'This field is required',
  }

  mounted() {
    if (this.$store.getters['authModule/isAuth']) {
      this.email = this.$store.state.userModule.email;
    } else {
      this.$store.dispatch('userModule/setToStateUserEmail', this.email);
    }

    this.$nextTick(() => {
      this.isLoading = true;
    });
  }

  saveEmailAndGo() {
    (this.$refs.email as any).validate();

    if ((this.$refs.email as any).hasError) {
      this.formHasError = true;
    } else {
      this.$q.loading.show();
      this.$store.dispatch('userModule/setToStateUserEmail', this.email).then(() => {
        this.$router.push({ name: this.isAuth ? 'StartMatching' : 'SignUp' });
        this.$q.loading.hide();
      });
    }
  }

  get isAuth(): boolean {
    return !!this.$store.getters['authModule/isAuth'];
  }
}
</script>

<style lang="scss" scoped>
  .login {
    .btn-login {
      max-width: 100px;
      color: #434343;
      cursor: pointer;
    }
  }

  #welcome-page-content {
    min-height: calc(100% - 113px);
    align-items: center;
    justify-content: space-around;
    max-width: 1600px;
  }

  .slide-up-enter-active,
  .slide-down-enter-active {
    transition: all .5s ease;
  }
  .slide-up-leave-active,
  .slide-down-leave-active {
    transition: all .5s ease-in;
  }
  .slide-up-enter, .slide-up-leave-to {
    transform: translateY(50px);
    opacity: 0;
  }
  .slide-down-enter, .slide-down-leave-to {
    transform: translateY(-50px);
    opacity: 0;
  }

  .demonstration {
    .q-img {
      flex: 0 1 640px;
    }
  }

  .introduction {
    padding: 30px 80px;
    flex: 0 1 640px;

    .input-email {
      width: 480px;

      ::v-deep {
        input {
          font-size: 15px;
        }

        .q-field__control-container {
          .q-field--dense .q-field__append {
            padding-right: 8px;
          }
          .q-field__control-container {
            padding-left: 10px;
            padding-right: 10px;

            .q-field__label {
              left: 10px !important;
            }
          }
        }
      }
    }

    h2 {
      color: #434343;
      font-size: 40px;
      font-weight: 400;
      max-width: 500px;
      line-height: 1.2;
      margin: 1em 0;
      letter-spacing: normal;
    }

    .text-body-custom {
      font-weight: 300;
      margin-bottom: 25px;
      line-height: 1.2;
      color: #434343;
      font-family: 'roboto', serif;
      font-size: 25px;
    }
  }
</style>
