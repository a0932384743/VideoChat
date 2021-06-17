// import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';

declare module 'rtcmulticonnection/*';

declare module 'vue/types/vue' {
  interface ComponentOptions<V extends Vue> {
    $copyText: VueClipboard;
  }
}
