import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  './middlewares';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as io from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import ENV from './config/env'
import VeeValidate from 'vee-validate';


Vue.use(VeeValidate);
moment.tz.setDefault('America/Cancun')
moment.locale('es');

Vue.use(
  new VueSocketIO({
    debug: ENV.DEBUG_SOCKET,
    connection: io( ENV.SOCKET_URI )
  })
);

Vue.use(VueMoment, {
  moment,
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  ENV,
  render: h => h(App)
}).$mount('#app')
