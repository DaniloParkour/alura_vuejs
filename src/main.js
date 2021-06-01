import Vue from 'vue' //vue core, the Global Vue Object (GVO)
import App from './App.vue' //our app implementation
import VueRouter from 'vue-router';

//The module imported below is instaled by command "npm install vue-resource --save"
import VueResource from 'vue-resource';

import { routes } from './routes';

import "./directives/Transform";

//File with PT_BR VeeValidade messages copied from "../node_modules/vee-validate/dist/locale/pt_BR.js"
import msg from './pt_BR';

//Work with form validations
import VeeValidate from 'vee-validate';

Vue.use(VueRouter);
Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

//The mode: "history" allows not use a "#" on URL
const router = new VueRouter({ routes, mode: "history" });

//We registrate the module/plugin VueResource on Global View Object
Vue.use(VueResource);

//Centralize the URL base od API
Vue.http.options.root = 'http://localhost:3000';

new Vue({ //instance of vue core
  el: '#app', //the elemento on index.html
  router,
  render: h => h(App)
})
