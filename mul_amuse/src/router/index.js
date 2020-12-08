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

Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '/',
      component: Login,
      meta: {
        requireAuth: false
      }
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
            roles: ['developer','admin', 'store']
          }
        },
        {
          path: '/productEdit',
          component: ProductEdit,
          meta: {
            module: "产品信息",
            requireAuth: true,
            roles: ['developer','admin']
          }
        },
        {
          path: '/modelList',
          component: ModelList,
          meta: {
            module: "产品信息",
            requireAuth: true,
            roles: ['developer','admin', 'store']
          }
        },
        {
          path: '/storeList',
          component: StoreList,
          meta: {
            module: "商家信息",
            requireAuth: true,
            roles: ['developer','admin']
          }
        },
        {
          path: '/storeOrder',
          component: StoreOrder,
          meta: {
            module: "商家信息",
            requireAuth: true,
            roles: ['developer', 'admin', 'store']
          }
        },
        {
          path: '/supervipSet',
          component: SupervipSet,
          meta: {
            requireAuth: true,
            roles: ['developer','admin']
          }
        },
        {
          path: '/userCommission',
          component: UserCommission,
          meta: {
            module: "用户信息",
            requireAuth: true,
            roles: ['developer','admin']
          }
        },
        {
          path: '/userList',
          component: UserList,
          meta: {
            module: "用户信息",
            requireAuth: true,
            roles: ['developer','admin']
          }
        },
        {
          path: '/userOrder',
          component: UserOrder,
          meta: {
            module: "用户信息",
            requireAuth: true,
            roles: ['developer','admin', 'store']
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
            roles: ['developer','admin', 'store']
          }
        },
        {
          path: '/storeAllOrder',
          component: StoreAllOrder,
          meta: {
            module: "订单信息",
            requireAuth: true,
            roles: ['developer','admin', 'store']
          }
        },
        {
          path: '/storeRealOrder',
          component: StoreRealOrder,
          meta: {
            module: "订单信息",
            requireAuth: true,
            roles: ['developer','admin', 'store']
          }
        },
        {
          path: '/storeNetOrder',
          component: StoreNetOrder,
          meta: {
            module: "订单信息",
            requireAuth: true,
            roles: ['developer','admin', 'store']
          }
        },
        {
          path: '/storeAppointOrder',
          component: StoreAppointOrder,
          meta: {
            module: "订单信息",
            requireAuth: true,
            roles: ['developer','admin', 'store']
          }
        },
        {
          path: '/storeSeeProduct',
          component: StoreSeeProduct,
          meta: {
            requireAuth: true,
            roles: ['developer','admin', 'store']
          }
        },
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/adminLogin',
      component: AdminLogin,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/storeLogin',
      component: StoreLogin,
      meta: {
        requireAuth: false
      }
    },
    {
      path: "*",
      component: Error404,
      meta: {
        requireAuth: false
      }
    }
  ],
  mode: 'history',
})

route.beforeEach((to, from, next) => {
  //跳转进度条
  let loadingBar = document.getElementById("global-loading");
  if (!loadingBar) {
    loadingBar = document.createElement("div");
    loadingBar.id = "global-loading";
    document.body.append(loadingBar);
  } else {
    loadingBar.style.display = 'block';
  }

  if (to.fullPath === '/login') {
    next();
  }
  if (to.fullPath === '/adminLogin') {
    next();
  }
  if (to.fullPath === '/storeLogin') {
    next();
  }

  let userToken = localStorage.getItem('userToken')
  let role = localStorage.getItem('role')
  if (to.meta.requireAuth) {
    if (userToken) {
      next();
    } else {
      next({path: '/login'})
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
  let loadingBar = document.getElementById("global-loading");
  if (loadingBar) loadingBar.style.display = 'none'
})

export default route
