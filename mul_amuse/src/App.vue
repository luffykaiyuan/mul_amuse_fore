<template>
  <a-layout id="layout">
    <a-layout-sider class="left-menu" v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">{{collapsed?'B站':'B站AntDesign的试用'}}</div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <router-link to="/" tag="div">
            <a-icon type="bar-chart" />
            <span>数据驾驶舱</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="2">
          <span slot="title"><a-icon type="appstore" /><span>员工管理</span></span>
          <a-menu-item key="2-1">
            <router-link to="/UserList" tag="div">
              <a-icon type="bar-chart" />
              <span>员工列表</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2-2">
            <span>员工统计</span>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="3">
          <span slot="title"><a-icon type="appstore" /><span>业务管理</span></span>
          <a-menu-item key="3-1">
            <router-link to="/OrderList" tag="div">
              <a-icon type="bar-chart" />
              <span>工单列表</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="3-2">
            <span>投诉列表</span>
          </a-menu-item>
          <a-menu-item key="3-3">
            <span>投诉列表2</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <a-dropdown style="float: right; margin-right: 20px;" :trigger="['click']">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            Luffykaiyuan
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <a href="http://www.alipay.com/"><a-icon type="scissor" />修改密码</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a href="http://www.taobao.com/"><a-icon type="logout" />退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>

      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>
<style>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
/*滚动区域背景*/
::-webkit-scrollbar-track-piece {
  background-color: rgb(17, 16, 16);
  -webkit-border-radius: 6px;
}
/*竖向滚动条*/
::-webkit-scrollbar-thumb:vertical {
  height: 5px;
  background-color: rgb(70, 68, 68);
  -webkit-border-radius: 6px;
}
/*横向滚动条*/
/*::-webkit-scrollbar-thumb:horizontal {*/
/*  width: 5px;*/
/*  background-color: red;*/
/*  -webkit-border-radius: 6px;*/
/*}*/


#layout{
  height: 100vh;
}
#layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#layout .trigger:hover {
  color: #1890ff;
}

#layout .logo {
  height: 32px;
  line-height: 32px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 2px;
  font-weight: bold;
  font-family: 楷体;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.left-menu{
  overflow: scroll;
}

</style>
