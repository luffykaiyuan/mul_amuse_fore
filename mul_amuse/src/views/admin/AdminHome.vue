<template>
  <a-layout id="layout">
    <a-layout-sider class="left-menu" v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">{{collapsed?'惠享':'惠享生活管理平台'}}</div>
      <a-menu theme="dark" mode="inline" :defaultOpenKeys="openKeys" :default-selected-keys="selectedKeys">
        <a-sub-menu key="商家信息">
          <span slot="title"><a-icon type="bank" /><span>商家信息</span></span>
          <a-menu-item key="/storeList">
            <router-link to="/storeList" tag="div">
              <span>商家列表</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="/storeOrder">
            <router-link to="/storeOrder" tag="div">
              <span>商家订单</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="产品信息">
          <span slot="title"><a-icon type="shopping" /><span>产品信息</span></span>
          <a-menu-item key="/productList">
            <router-link to="/productList" tag="div">
              <span>产品列表</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="/productEdit">
            <router-link to="/productEdit" tag="div">
              <span>产品编辑</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="/modelList">
            <router-link to="/modelList" tag="div">
              <span>型号列表</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="用户信息">
          <span slot="title"><a-icon type="user" /><span>用户信息</span></span>
          <a-menu-item key="/userList">
            <router-link to="/userList" tag="div">
              <span>用户列表</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="/userOrder">
            <router-link to="/userOrder" tag="div">
              <span>用户订单</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="/userCommission">
            <router-link to="/userCommission" tag="div">
              <span>佣金情况</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="/supervipSet">
          <router-link to="/supervipSet" tag="div">
            <a-icon type="usergroup-add" />
            <span>超级会员</span>
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
