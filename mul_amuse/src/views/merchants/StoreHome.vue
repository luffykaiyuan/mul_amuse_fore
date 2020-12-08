<template>
  <a-layout id="layout">
    <a-layout-sider class="left-menu" v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">{{collapsed?'惠享':'惠享生活管理平台'}}</div>
      <a-menu theme="dark" mode="inline" :defaultOpenKeys="openKeys" :default-selected-keys="selectedKeys">
        <a-menu-item key="/storeIndex">
          <router-link to="/storeIndex" tag="div">
            <a-icon type="home" />
            <span>基本信息</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/storeSeeProduct">
          <router-link to="/storeSeeProduct" tag="div">
            <a-icon type="shop" />
            <span>产品信息</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="订单信息">
          <span slot="title"><a-icon type="shopping" /><span>订单信息</span></span>
          <a-menu-item key="/storeAllOrder">
            <router-link to="/storeAllOrder" tag="div">
              <span>全部订单</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="/storeRealOrder">
            <router-link to="/storeRealOrder" tag="div">
              <span>实物订单</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="/storeNetOrder">
            <router-link to="/storeNetOrder" tag="div">
              <span>虚拟订单</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="/storeAppointOrder">
            <router-link to="/storeAppointOrder" tag="div">
              <span>预约订单</span>
            </router-link>
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
        <a-dropdown style="float: right; margin-right: 20px;" :trigger="['click']" v-if="collapsed">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            {{storeName}}
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <a @click="logout"><a-icon type="logout" />退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>

      <a-layout-content :style="{ margin: '24px 16px', background: '#fff'}" data-app="true">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import publicJs, {request} from "../../plugins/js/publicJs";

export default {
  data() {
    return {
      collapsed: publicJs.collapsed,
      selectedKeys: [],
      openKeys: [],
      storeName: "",
    };
  },
  created() {
    if (this.$route.meta && this.$route.meta.module){
      this.openKeys = [this.$route.meta.module]
    }
    this.selectedKeys = [this.$route.path];
    this.storeName = localStorage.getItem("storeName");
  },
  methods:{
    logout(){
      localStorage.removeItem("userToken")
      localStorage.removeItem("roles")
      this.$router.push("/storeLogin")
    }
  }
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
