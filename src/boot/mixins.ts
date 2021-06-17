import { boot } from 'quasar/wrappers';
import mixins from '../mixins';

export default boot(({ Vue }) => {
  Vue.mixin(mixins);
});
