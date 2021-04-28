//import Vue from 'vue'
const Vue = require('vue');
//import Router from 'vue-router'
const Router =  require('vue-router');
import AdminHome from '../views/admin/AdminHome'
import ProductList from "../views/admin/ProductList";
import StoreList from "../views/admin/StoreList";
import StoreOrder from "../views/admin/StoreOrder";
import UserCommission from "../views/admin/UserCommission";
import UserList from "../views/admin/UserList";
import UserOrder from "../views/admin/UserOrder";
import Login from "../views/Login";
import Error404 from "../views/Error404";
import ProductEdit from "../views/admin/ProductEdit";
import ModelList from "../views/admin/ModelList";
import AdminLogin from "../views/AdminLogin";
import StoreLogin from "../views/StoreLogin";
import StoreHome from "../views/merchants/StoreHome";
import StoreIndex from "../views/merchants/StoreIndex";
import StoreSeeProduct from "../views/merchants/StoreProduct";
import StoreRealOrder from "../views/merchants/StoreRealOrder";
import StoreNetOrder from "../views/merchants/StoreNetOrder";
import StoreAppointOrder from "../views/merchants/StoreAppointOrder";
import StoreAllOrder from "../views/merchants/StoreAllOrder";
import Index from "../views/userTest/Index";
import UserHome from "../views/userTest/UserHome";
import MyInfo from "../views/userTest/MyInfo";
import ProductDetail from "../views/userTest/ProductDetail";
import VipZoom from "../views/userTest/VipZoom";
import OrderSubmit from "../views/userTest/OrderSubmit";
import MyCommission from "../views/userTest/MyCommission";
import MyOrder from "../views/userTest/MyOrder";
import NetOrderInfo from "../views/userTest/NetOrderInfo";
import SuperProduct from "../views/admin/SuperProduct";
import MapTest from "../views/userTest/MapTest";
import StoreAddress from "../views/admin/StoreAddress";
import WeChatTest from "../views/userTest/WeChatTest";
import JumpRouter from "../views/userTest/JumpRouter";
import axios from "axios";
import publicJs from "../plugins/js/publicJs";
import Home from "../views/user/Home";
import Member from "../views/user/Member";
import User from "../views/user/User";
import Details from "../views/user/Details";
import newAddress from "../views/user/newAddress";
import Address from "../views/user/Address";
import Box from "../views/user/Box";
import Order from "../views/user/Order";
import Card from "../views/user/Card";
import TimeLimit from "../views/admin/TimeLimit";
import Register from "../views/user/Register";
import Cdkey from "../views/user/Cdkey";

//Vue.use(Router)

Vue.prototype.axios = axios

const route = new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      meta: {
        requireAuth: false
      }
    },

    {
      //首页
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true,
        weRequire: 'user',
        roles: ['developer','admin', 'store', 'user'],
        keepAlive:true,
      }
    },
    {
      //首页
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true,
        weRequire: 'user',
        roles: ['developer','admin', 'store', 'user'],
        keepAlive:true,
      }
    },
    {
      //会员专区
      path: '/member',
      name: 'Member',
      component: Member,
      meta: {
        requireAuth: true,
        weRequire: 'user',
        roles: ['developer','admin', 'store', 'user'],
        keepAlive:true,
      }
    },
    {
      //我的页面
      path: '/my',
      name: 'User',
      component: User,
      meta: {
        requireAuth: true,
        weRequire: 'user',
        roles: ['developer','admin', 'store', 'user'],
        keepAlive:false,
      }
    },
    {
      //详情页面
      path: '/details/:id',
      name: 'Details',
      component: Details,
      meta: {
        requireAuth: true,
        weRequire: 'user',
        roles: ['developer','admin', 'store', 'user'],
        keepAlive:false,
      }
    },
    {
      //新增地址
      path: '/newAddress',
      name: 'newAddress',
      component: newAddress,
      meta: {
        requireAuth: true,
        weRequire: 'user',
        roles: ['developer','admin', 'store', 'user'],
        keepAlive:false,
      }
    },
    {
      //地址
      path: '/address',
      name: 'Address',
      component: Address,
      meta: {
        requireAuth: true,
        weRequire: 'user',
        roles: ['developer','admin', 'store', 'user'],
        keepAlive:false,
      }
    },
    {
      //地址
      path: '/box',
      name: 'Box',
      component: Box,
      meta: {
        requireAuth: true,
        weRequire: 'user',
        roles: ['developer','admin', 'store', 'user'],
        keepAlive:false,
      }
    },
    {
      path: "/order/:userId/:storeId/:productId/:modelId/",
      name: "Order",
      component: Order,
      meta: {
        requireAuth: true,
        weRequire: 'user',
        roles: ['developer','admin', 'store', 'user'],
        keepAlive:false,
      }
    },
    {
      // 会员卡页面
      path: "/card",
      name: "Card",
      component: Card,
      meta: {
        requireAuth: true,
        weRequire: 'user',
        roles: ['developer','admin', 'store', 'user'],
        keepAlive:true,
      }
    },
    {
      //用户注册页面
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        requireAuth: true,
        weRequire: 'user',
        roles: ['developer','admin', 'store', 'user'],
        keepAlive:false,
      }
    },
    {
      //兑换码页面
      path: "/cdkey",
      name: "Cdkey",
      component: Cdkey,
      meta: {
        requireAuth: true,
        weRequire: 'user',
        roles: ['developer','admin', 'store', 'user'],
        keepAlive:false,
      }
    },

    {
      path: '/userHome',
      component: UserHome,
      children: [
        {
          path: '/index',
          component: Index,
          meta: {
            module: "首页",
            requireAuth: true,
            weRequire: 'user',
            roles: ['developer','admin', 'store', 'user']
          }
        },
        {
          path: '/myInfo',
          component: MyInfo,
          meta: {
            module: "我的信息",
            requireAuth: true,
            weRequire: 'user',
            roles: ['developer','admin', 'store', 'user']
          }
        },
        {
          path: '/productDetail/:productId/',
          component: ProductDetail,
          meta: {
            module: "详情",
            requireAuth: true,
            weRequire: 'user',
            roles: ['developer','admin', 'store', 'user']
          }
        },
        {
          path: '/orderSubmit/:userId/:storeId/:productId/:modelId/',
          component: OrderSubmit,
          meta: {
            module: "提交订单",
            requireAuth: true,
            weRequire: 'user',
            roles: ['developer','admin', 'store', 'user']
          }
        },
        {
          path: '/myCommission/',
          component: MyCommission,
          meta: {
            module: "我的佣金",
            requireAuth: true,
            weRequire: 'user',
            roles: ['developer','admin', 'store', 'user']
          }
        },
        {
          path: '/myOrder/',
          component: MyOrder,
          meta: {
            module: "我的订单",
            requireAuth: true,
            weRequire: 'user',
            roles: ['developer','admin', 'store', 'user']
          }
        },
        {
          path: '/vipZoom',
          component: VipZoom,
          meta: {
            module: "会员专区",
            requireAuth: true,
            weRequire: 'user',
            roles: ['developer','admin', 'store', 'user']
          }
        }
      ]
    },
    {
      path: '/adminHome',
      component: AdminHome,
      children: [
        {
          path: '/productList',
          component: ProductList,
          meta: {
            module: "产品信息",
            requireAuth: true,
            weRequire: 'admin',
            roles: ['developer','admin', 'store'],
            keepAlive:false,
          }
        },
        {
          path: '/superProduct',
          component: SuperProduct,
          meta: {
            module: "产品信息",
            requireAuth: true,
            weRequire: 'admin',
            roles: ['developer','admin', 'store'],
            keepAlive:false,
          }
        },
        {
          path: '/productEdit',
          component: ProductEdit,
          meta: {
            module: "产品信息",
            requireAuth: true,
            weRequire: 'admin',
            roles: ['developer','admin'],
            keepAlive:false,
          }
        },
        {
          path: '/modelList',
          component: ModelList,
          meta: {
            module: "产品信息",
            requireAuth: true,
            weRequire: 'admin',
            roles: ['developer','admin', 'store'],
            keepAlive:false,
          }
        },
        {
          path: '/timeLimit',
          component: TimeLimit,
          meta: {
            module: "产品信息",
            requireAuth: true,
            weRequire: 'admin',
            roles: ['developer','admin', 'store'],
            keepAlive:false,
          }
        },
        {
          path: '/storeList',
          component: StoreList,
          meta: {
            module: "商家信息",
            requireAuth: true,
            weRequire: 'admin',
            roles: ['developer','admin'],
            keepAlive:false,
          }
        },
        {
          path: '/storeAddress',
          component: StoreAddress,
          meta: {
            module: "商家信息",
            requireAuth: true,
            weRequire: 'admin',
            roles: ['developer','admin'],
            keepAlive:false,
          }
        },
        {
          path: '/storeOrder',
          component: StoreOrder,
          meta: {
            module: "商家信息",
            requireAuth: true,
            weRequire: 'admin',
            roles: ['developer', 'admin', 'store'],
            keepAlive:false,
          }
        },
        {
          path: '/userCommission',
          component: UserCommission,
          meta: {
            module: "用户信息",
            requireAuth: true,
            weRequire: 'admin',
            roles: ['developer','admin'],
            keepAlive:false,
          }
        },
        {
          path: '/userList',
          component: UserList,
          meta: {
            module: "用户信息",
            requireAuth: true,
            weRequire: 'admin',
            roles: ['developer','admin'],
            keepAlive:false,
          }
        },
        {
          path: '/userOrder',
          component: UserOrder,
          meta: {
            module: "用户信息",
            requireAuth: true,
            weRequire: 'admin',
            roles: ['developer','admin', 'store'],
            keepAlive:false,
          }
        }
      ]
    },
    {
      path: '/storeHome',
      component: StoreHome,
      children: [
        {
          path: '/storeIndex',
          component: StoreIndex,
          meta: {
            requireAuth: true,
            weRequire: 'store',
            roles: ['developer','admin', 'store'],
            keepAlive:false,
          }
        },
        {
          path: '/storeAllOrder',
          component: StoreAllOrder,
          meta: {
            module: "订单信息",
            requireAuth: true,
            weRequire: 'store',
            roles: ['developer','admin', 'store'],
            keepAlive:false,
          }
        },
        {
          path: '/storeRealOrder',
          component: StoreRealOrder,
          meta: {
            module: "订单信息",
            requireAuth: true,
            weRequire: 'store',
            roles: ['developer','admin', 'store'],
            keepAlive:false,
          }
        },
        {
          path: '/storeNetOrder',
          component: StoreNetOrder,
          meta: {
            module: "订单信息",
            requireAuth: true,
            weRequire: 'store',
            roles: ['developer','admin', 'store'],
            keepAlive:false,
          }
        },
        {
          path: '/storeAppointOrder',
          component: StoreAppointOrder,
          meta: {
            module: "订单信息",
            requireAuth: true,
            weRequire: 'store',
            roles: ['developer','admin', 'store'],
            keepAlive:false,
          }
        },
        {
          path: '/storeSeeProduct',
          component: StoreSeeProduct,
          meta: {
            requireAuth: true,
            weRequire: 'store',
            roles: ['developer','admin', 'store'],
            keepAlive:false,
          }
        },
      ]
    },
    {
      path: '/netOrderInfo/:orderNumber/',
      component: NetOrderInfo,
      meta: {
        requireAuth: true,
        weRequire: 'store',
        roles: ['developer','admin', 'store'],
        keepAlive:false,
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        requireAuth: false,
        keepAlive:false,
      }
    },
    {
      path: '/adminLogin',
      component: AdminLogin,
      meta: {
        requireAuth: false,
        keepAlive:false,
      }
    },
    {
      path: '/storeLogin',
      component: StoreLogin,
      meta: {
        requireAuth: false,
        keepAlive:false,
      }
    },
    // {
    //   path: "/mapTest",
    //   component: MapTest,
    //   meta: {
    //     requireAuth: false
    //   }
    // },
    // {
    //   path: "/weChatTest",
    //   component: WeChatTest,
    //   meta: {
    //     requireAuth: true,
    //     weRequire: 'user',
    //   }
    // },
    {
      path: "/jumpRouter",
      component: JumpRouter,
      meta: {
        requireAuth: false,
        keepAlive:false,
      }
    },
    {
      path: "*",
      component: Error404,
      meta: {
        requireAuth: false,
        keepAlive:false,
      }
    }
  ],
  mode: 'history',
})

route.beforeEach((to, from, next) => {
  if (to.fullPath === '/login') {
    next();
  }
  if (to.fullPath === '/adminLogin') {
    next();
  }
  if (to.fullPath === '/storeLogin') {
    next();
  }
  if (to.fullPath === '/jumpRouter') {
    next();
  }
  var openId = localStorage.getItem("openId");
  var userId = localStorage.getItem("userToken");
  //界面是否需要登录
  if (to.meta.requireAuth) {
    //是否为用户界面
    if (to.meta.weRequire === 'user'){
      if (openId && userId) {
        next();
      } else {
        window.location.href = axios.defaults.baseURL + publicJs.urls.doLogin + "?toPage=" + to.fullPath.substr(1);
      }
    }
    //是否为管理员界面
    else if (to.meta.weRequire === 'admin'){
      var role = localStorage.getItem("roles");
      if (role === "admin"){
        next();
      }else {
        next({path: '/adminLogin'})
      }
    }
    //商家界面
    else {
      var role = localStorage.getItem("roles");
      if (role === "store"){
        next();
      }else {
        next({path: '/storeLogin'})
      }
    }
  }else {
    next();
  }
  // console.log('上一个页面：', from)
  // console.log('下一个页面：', to)
  // let userToken = localStorage.getItem('userToken')
  // let role = localStorage.getItem('role')
  // if (to.meta.requireAuth) {      // 1)判断该路由是否需要登录权限
  //   if (userToken) {  // 2)判断本地是否存在token,有说明登录过
  //     if (to.meta.roles.length !== 0) {
  //       //下一个页面的rules是否与当前token相等
  //       for (let i = 0; i < to.meta.roles.length; i++) {
  //         if (role === to.meta.roles[i]) {
  //           next()       //角色匹配已登录，正常进入to.meta.roles[i]的页面
  //           break
  //         } else if (i === to.meta.roles.length - 1) {
  //           next({ path: '/Error' }) } }
  //     } else { next() }
  //   } else {
  //     next({path: '/Login' })  }
  // } else { next() }
  // /* 如果本地存在token,则不允许直接跳转到登录页面 */
  // if (to.fullPath === '/Login') {
  //   if (userToken) {
  //     next({ path: from.fullPath    })
  //   } else { next()} }
})

route.afterEach((to, from) => {
  window.scrollTo(0, 0);
})

export default route
