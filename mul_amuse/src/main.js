// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
const Vue = require('vue');
//import antd from 'ant-design-vue';
const antd = require('ant-design-vue')
import App from './App';
import Vant from 'vant';
//const Vant = require('vant');
import 'vant/lib/index.css';
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
const ElementUI =  require('element-ui');
//import 'ant-design-vue/dist/antd.css';
import './plugins/css/publicCss.css'
import './plugins/js/publicJs.js'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import wx from 'weixin-js-sdk'
import VueTouch from 'vue-touch'

Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(Vant);
Vue.use(wx);
//Vue.use(antd);
//Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.Url = function (e) {
  this.$router.push(e);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  components: { App },
  template: '<App/>'
})
