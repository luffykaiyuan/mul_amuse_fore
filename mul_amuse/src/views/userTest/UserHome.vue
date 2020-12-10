<template>
  <a-layout id="layout">
    <a-layout-sider class="left-menu" v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">{{collapsed?'惠享':'惠享生活管理平台'}}</div>
      <a-menu theme="dark" mode="inline" :defaultOpenKeys="openKeys" :default-selected-keys="selectedKeys">
        <a-menu-item key="/index">
          <router-link to="/index" tag="div">
            <a-icon type="home" />
            <span>首页</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/vipZoom">
          <router-link to="/vipZoom" tag="div">
            <a-icon type="crown" />
            <span>超级会员</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/myInfo">
          <router-link to="/myInfo" tag="div">
            <a-icon type="user" />
            <span>个人中心</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
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
  },
  methods:{
    logout(){
      localStorage.removeItem("userToken")
      localStorage.removeItem("roles")
      this.$router.push("/login")
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
