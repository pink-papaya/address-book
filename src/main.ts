import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAddressBook,
  faBars,
  faSearch,
  faUsers,
  faPlus,
  faTimes,
  faSpinner,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vuelidate from 'vuelidate';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/misc/registerServiceWorker';
import '@/misc/handleNetworkStatus';
import '@/misc/handleAppleInstallPrompt';
import '@/assets/scss/tailwind.scss';

library.add(faAddressBook);
library.add(faBars);
library.add(faSearch);
library.add(faUsers);
library.add(faPlus);
library.add(faTimes);
library.add(faSpinner);
library.add(faPen);
library.add(faTrash);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
