<template lang="pug">
  .row.justify-center.full-width.full-height
    .row.items-center.justify-center.full-width
      .full-width
        .flex.q-mb-lg.justify-center
          router-link.text-decoration-none(
            :to="{name: 'Welcome'}"
          )
            .logo-site.text-h4.no-margin
              q-img(
                :src="require('../../assets/logo.svg')"
                width="60px"
                height="40px"
              )
              | Adjoined
        transition(
          name="slide-up"
          mode="out-in"
        )
          router-view(
            v-if="isVisibleRoute"
          )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Auth extends Vue {
  private isVisibleRoute = false;

  mounted() {
    if (this.$store.state.authModule.authenticated) {
      this.$router.push({ name: 'StartMatching' });
    }
    this.isVisibleRoute = true;
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .form-layer {
    max-width: 320px;
  }

  .logo-site {
    font-size: 36px;
    padding: 0;

    .q-img {
      margin-right: 30px;
    }
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
</style>
