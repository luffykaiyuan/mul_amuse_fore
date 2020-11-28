import Vue from 'vue'
import Router from 'vue-router'
import AdminHome from '../views/admin/AdminHome'
import ProductList from "../views/admin/ProductList";
import StoreList from "../views/admin/StoreList";
import StoreOrder from "../views/admin/StoreOrder";
import SupervipSet from "../views/admin/SupervipSet";
import UserCommission from "../views/admin/UserCommission";
import UserList from "../views/admin/UserList";
import UserOrder from "../views/admin/UserOrder";
import Login from "../views/Login";
import Error404 from "../views/Error404";

Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '/',
      component: AdminHome,
      children: [
        {
          path: '/productList',
          component: ProductList,
          meta: {
          }
        },
        {
          path: '',
          component: StoreList,
          meta: {
            module: "商家信息"
          }
        },
        {
          path: '/StoreList',
          component: StoreList,
          meta: {
            module: "商家信息"
          }
        },
        {
          path: '/storeOrder',
          component: StoreOrder,
          meta: {
            module: "商家信息"
          }
        },
        {
          path: '/supervipSet',
          component: SupervipSet,
          meta: {
          }
        },
        {
          path: '/userCommission',
          component: UserCommission,
          meta: {
            module: "用户信息"
          }
        },
        {
          path: '/userList',
          component: UserList,
          meta: {
            module: "用户信息"
          }
        },
        {
          path: '/userOrder',
          component: UserOrder,
          meta: {
            module: "用户信息"
          }
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: "*",
      component: Error404
    }

  ],
  mode: 'history',
})

route.beforeEach((to, from, next) => {
  next();
})

export default route
