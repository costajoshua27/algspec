import Vue from 'vue';
import router from '@/config/router';
import App from '@/App';

// Import all the components/plugins needed from bootstrap-vue
import {
  LayoutPlugin, // b-container, b-row, b-col, etc...
  ModalPlugin,
  CardPlugin,
  DropdownPlugin,
  NavbarPlugin,
  FormInputPlugin,
  OverlayPlugin,
  ButtonPlugin,
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
Vue.use(OverlayPlugin);
Vue.use(ButtonPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
