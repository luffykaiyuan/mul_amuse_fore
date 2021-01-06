<!--
 * @description:会员卡页面
 * @fileName: Card.vue
 * @author: Javi
 * @date: 2021-01-01 15:09:35
 * @version: V1.0
 !-->
<template>
  <div
    class="Card"
    :style="{
      background: `url(${require('@/assets/img/card/card-bg.png')})`,
    }"
  >
    <section class="Card_section">
      <van-image
        width="100%"
        height="100%"
        :src="require('@/assets/img/card/card-season.png')"
      ></van-image>
      <van-button color="#1f1f1f" round @click="Url('/order')"
        >立即购买</van-button
      >
      <van-image
        width="100%"
        height="100%"
        :src="require('@/assets/img/card/card-month.png')"
      ></van-image>
      <van-button color="#1f1f1f" round @click="Url('/order')"
        >立即购买</van-button
      >
      <van-image
        width="100%"
        height="100%"
        :src="require('@/assets/img/card/card-one.png')"
      ></van-image>
      <van-button color="#1f1f1f" round @click="Url('/order')"
        >立即购买</van-button
      >
    </section>
  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {};
  },
};
</script>

<style lang='scss'>
.Card {
  position: relative;
  width: 100%;
  height: 100%;
  section {
    background: transparent;
  }
  background-size: 100% 100% !important;
  .Card_section {
    margin: 0;
    .van-button {
      margin-bottom: 5px;
    }
  }
}
</style>
