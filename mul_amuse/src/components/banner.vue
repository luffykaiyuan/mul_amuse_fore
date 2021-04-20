<!--
 * @description:轮播图组件
 * @fileName: banner.vue
 * @author: Javi
 * @date: 2020-12-29 10:39:32
 * @version: V1.0
 !-->
<template>
  <div class="banner_onents">
    <van-swipe class="my-swipe" :autoplay="6000" indicator-color="white">
      <van-swipe-item
        v-for="item in Arr"
        :key="item[0]"
        @click="Url(item.link)"
        :class="{ StateHover: !HomeState }"
      >
        <van-image width="100%" height="100%" :src="item.img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 定位 -->
<!--    <div class="Gps" v-if="HomeState">
      <p>
        <van-image
          width="20"
          style="top:5px"
          height="20"
          :src="require('@/assets/img/home/home-icon-navigation.png')"
        />
        <span>成都市</span>
      </p>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "banner_onents",
  data() {
    return {};
  },
  props: {
    HomeState: {
      //是否为首页 ：true首页 false会员页面
      type: Boolean,
      default: true,
    },
    Arr: {
      type: Array,
    },
  },
  created() {
  },
};
</script>

<style lang='scss'>
.banner_onents {
  width: 100%;
  position: relative;
  .StateHover {
    margin-top: 30px;
    .van-image {
      width: 90% !important;
      height: 100%;
      border-radius: 5px !important;
      margin: 0 auto;
    }
    .van-image__img {
      border-radius: 5px !important;
    }
  }
  .Gps {
    position: absolute;
    left: 50%;
    margin-left: -150px;
    bottom: -5%;
    width: 300px;
    height: 60px;
    background: white;
    border-radius: 5px;
    box-shadow: 0px 2px 1px 1px #faf5f5;
    p {
      display: flex;
      margin: 1em;
      justify-content: center;
      span {
        font-size: 19px;
        margin-left: 5px;
      }
    }
  }
}
</style>
