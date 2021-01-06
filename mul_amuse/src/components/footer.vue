<template>
  <div class="footer">
    <van-tabbar
      v-model="hoverActive"
      active-color="#971818"
      :placeholder="true"
      inactive-color="#000"
    >
      <van-tabbar-item to="/">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? home.active : home.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/member">
        <span>会员专区</span>
        <template #icon="props">
          <img :src="props.active ? hy.active : hy.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="my">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? user.active : user.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hoverActive: this.active,
      home: {
        active: require("@/assets/img/footer/nav-icon-index-sele.png"),
        inactive: require("@/assets/img/footer/nav-icon-index-unsele.png"),
      },
      hy: {
        active: require("@/assets/img/footer/nav-icon-crown-sele.png"),
        inactive: require("@/assets/img/footer/nav-icon-crown-unsele.png"),
      },
      user: {
        active: require("@/assets/img/footer/nav-icon-person-sele.png"),
        inactive: require("@/assets/img/footer/nav-icon-person-unsele.png"),
      },
    };
  },
  props: {
    active: Number,
  },
};
</script>

<style lang='scss'>
.footer {
  .van-tabbar {
    z-index: 999;
  }
}
</style>
