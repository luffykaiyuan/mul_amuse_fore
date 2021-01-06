
<template>
  <div class="box">
    <van-row
      class="box_top"
      :style="{
        background: `url(${require('@/assets/img/box/box-bg.png')})`,
      }"
    >
      <van-col span="10" offset="2">
        <h4>我的惠享总收益：<br />￥ <span style="font-size: 35px">0</span></h4>
      </van-col>
      <van-col span="4" offset="8">
        <span class="box_top_sp" @click="spanMessage" style="cursor: pointer"
          >收益怎么来</span
        >
      </van-col>
    </van-row>
    <van-row
      class="box_body"
      :style="{
        background: `url(${require('@/assets/img/box/box-bg-card.png')})`,
      }"
    >
      <van-col span="6" offset="2" class="box_body_cols">可提现<br />0</van-col>
      <van-col span="6" offset="2" class="box_body_cols">已提现<br />0</van-col>
      <van-col span="6" offset="2" class="box_body_cols"
        ><span style="cursor: pointer" @click="colMessage">提现中</span
        ><br />0</van-col
      >
    </van-row>
    <van-row v-if="stauts === 1">
      <van-col span="24" style="margin-top: 120px">你的小伙伴呢? ...</van-col>
    </van-row>
    <van-row v-if="stauts === 2" style="font-size: 13px">
      <van-row v-if="stauts == '2'" style="margin: 20px">
        <van-col span="8">达人性名</van-col>
        <van-col span="8">消费</van-col>
        <van-col span="8">为您带来的收益</van-col>
      </van-row>
      <van-row v-if="stauts == '2'" style="" class="box_body_data">
        <van-col span="8">代**</van-col>
        <van-col span="8">￥ 888.8</van-col>
        <van-col span="8">￥ 0</van-col>
      </van-row>
      <van-row v-if="stauts == '2'" style="" class="box_body_data">
        <van-col span="8">代**</van-col>
        <van-col span="8">￥ 888.8</van-col>
        <van-col span="8">￥ 0</van-col>
      </van-row>
      <van-row v-if="stauts == '2'" style="" class="box_body_data">
        <van-col span="8">代**</van-col>
        <van-col span="8">￥ 888.8</van-col>
        <van-col span="8">￥ 0</van-col>
      </van-row>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stauts: 2,
    };
  },
  methods: {
    spanMessage() {
      this.$dialog.alert({
        title: "收益怎么来的?",
        message: "收益通过....",
      });
    },
    colMessage() {
      this.$dialog.alert({
        title: "提现",
      });
    },
  },
};
</script>

<style lang="scss">
.box {
  .box_top {
    width: 100%;
    background-size: 100% 100% !important;
    background-repeat: no-repeat !important;
    background-position-y: -90px !important;
    color: #ffffff;
    text-align: left;
    height: 300px;
    padding-top: 20px;
  }
  .box_body {
    height: 120px;
    background-size: 100% 100% !important;
    background-repeat: no-repeat !important;
    margin: 20px;
    margin-top: -180px;
  }
  .box_body_cols {
    margin-top: 30px;
    text-align: left;
  }
  .box_top_sp {
    font-size: 9px;
  }
  .box_body_data {
    background: #ffffff;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #c0bfbf;
    margin: 0 20px 0 20px;
  }
}
</style>
