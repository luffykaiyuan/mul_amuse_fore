<!--
 * @description:广告位组件
 * @fileName: advertisement.vue
 * @author: Javi
 * @date: 2020-12-29 14:19:43
 * @version: V1.0
 !-->
<template>
  <div class="advertisement">
    <!-- 广告位 -->
    <van-swipe class="my-swipe" :autoplay="6000" indicator-color="white">
      <van-swipe-item
        v-for="item in Arr"
        :key="item[0]"
        @click="!item.link ? Open() : Url(item.link)"
      >
        <van-image width="100%" height="100%" :src="item.img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 广告位结束 -->
    <van-dialog v-model="ShowState">
      <van-image
        width="100%"
        height="100%"
        :src="require('@/assets/img/details/qrcode.jpg')"
      ></van-image>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ShowState: false,
      Arr: [
        {
          img: require("@/assets/img/home/home-poster1.png"),
          link: false,
        },
        {
          img: require("@/assets/img/home/home-poster1.png"),
          link: "/details/1",
        },
      ],
    };
  },
  methods: {
    Open() {
      this.ShowState = true;
    },
  },
};
</script>

<style>
</style>
