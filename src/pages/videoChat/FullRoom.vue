<template lang="pug">
  q-page.row.items-center.justify-evenly
    .full-page-wrapper
      .full-page-header.q-my-lg.q-py-lg
        .text-h4 The table is currently full.
      .full-page-body.q-my-lg.q-py-lg
        q-btn.full-page-btn.app-button.q-pa-sm(
          outline
          dense
          label="Return to Home Page"
          to="/"
        )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class PageFullRoom extends Vue {}
</script>

<style lang="scss" scoped>
  .full-page-body {
    width: 100%;
    display: flex;
    justify-content: center;
    .full-page-btn {
      width: 80%;
    }
  }
</style>
