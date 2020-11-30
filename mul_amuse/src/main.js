// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import './plugins/css/publicCss.css'
import './plugins/js/publicJs.js'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export

Vue.config.productionTip = false

Vue.use(Antd);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  components: { App },
  template: '<App/>'
})
