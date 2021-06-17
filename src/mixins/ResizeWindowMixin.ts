/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onResizeWindow"] }] */

import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ResizeWindowMixin extends Vue {
  public constructor() {
    super();

    this.onResizeWindow = this.onResizeWindow.bind(this);
  }

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResizeWindow);
    });

    this.onResizeWindow();
  }

  destroyed() {
    window.removeEventListener('resize', this.onResizeWindow);
  }

  onResizeWindow(): void {
    // ...
  }
}
