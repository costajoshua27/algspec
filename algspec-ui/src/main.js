import Vue from 'vue';
import VueKonva from 'vue-konva';
import router from '@/config/router';
import { Themes } from '@/config/theme';
import store from '@/store';
import App from '@/App';

// Import all the components/plugins needed from bootstrap-vue
import {
  LayoutPlugin, // b-container, b-row, b-col, etc...
  ModalPlugin,
  CardPlugin,
  DropdownPlugin,
  NavbarPlugin,
  FormInputPlugin,
  FormSelectPlugin,
  OverlayPlugin,
  ButtonPlugin,
  FormPlugin,
  FormGroupPlugin,
  AlertPlugin,
  SpinnerPlugin,
  PopoverPlugin,
  ProgressPlugin,
  BIcon,
  BIconExclamationCircleFill,
  BIconGrid1x2Fill,
  BIconBarChartFill,
  BIconDiagram3Fill,
  BIconGearFill,
  BIconHouseFill,
  BIconDoorOpenFill,
  BIconPersonFill,
  BIconCaretRightFill
} from 'bootstrap-vue';
import Multiselect from 'vue-multiselect';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';

Vue.component('multiselect', Multiselect);
Vue.use(LayoutPlugin);
Vue.use(ModalPlugin);
Vue.use(CardPlugin);
Vue.use(DropdownPlugin);
Vue.use(NavbarPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormSelectPlugin);
Vue.use(OverlayPlugin);
Vue.use(ButtonPlugin);
Vue.use(FormPlugin);
Vue.use(FormGroupPlugin);
Vue.use(AlertPlugin);
Vue.use(SpinnerPlugin);
Vue.use(PopoverPlugin);
Vue.use(ProgressPlugin);
Vue.component('BIcon', BIcon);
Vue.component('BIconExclamationCircleFill', BIconExclamationCircleFill);
Vue.component('BIconGrid1x2Fill', BIconGrid1x2Fill);
Vue.component('BIconBarChartFill', BIconBarChartFill);
Vue.component('BIconDiagram3Fill', BIconDiagram3Fill);
Vue.component('BIconGearFill', BIconGearFill);
Vue.component('BIconHouseFill', BIconHouseFill);
Vue.component('BIconDoorOpenFill', BIconDoorOpenFill);
Vue.component('BIconPersonFill', BIconPersonFill);
Vue.component('BIconCaretRightFill', BIconCaretRightFill);

Vue.config.productionTip = false;

// Add other plugins
Vue.use(VueKonva);
Vue.prototype.$themes = new Themes();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');