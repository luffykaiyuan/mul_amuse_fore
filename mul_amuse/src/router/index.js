import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserList from '@/views/User/UserList'
import OrderList from '@/views/Work/OrderList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/userList',
      component: UserList
    },
    {
      path: '/orderList',
      component: OrderList
    },
  ]
})
