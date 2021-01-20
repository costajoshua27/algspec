import Vue from 'vue';
import VueKonva from 'vue-konva';
import JsonEditor from 'vue-edit-json';
import router from '@/config/router';
import api from '@/config/api';
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
  OverlayPlugin,
  ButtonPlugin,
  FormPlugin,
  FormGroupPlugin,
  AlertPlugin,
  SpinnerPlugin
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
Vue.use(FormPlugin);
Vue.use(FormGroupPlugin);
Vue.use(AlertPlugin);
Vue.use(SpinnerPlugin);

Vue.config.productionTip = false;

// Add other plugins
Vue.use(VueKonva);
Vue.use(JsonEditor);

api.get('user/isAuthenticated')
  .then(response => {
    if (response.data.isAuthenticated) {
      api.get('user/me')
      .then(response => {
        store.commit('user/setUser', response.data);
        store.commit('user/setIsAuthenticated', true);
        store.commit('setGlobalLoading', false);
        router.push({ name: 'Welcome' });
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      store.commit('setGlobalLoading', false);
      if (router.currentRoute.name !== 'Login') {
        router.push({ name: 'Login' });
      }
      
    }
  })
  .catch(error => {
    console.log(error);
  });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');