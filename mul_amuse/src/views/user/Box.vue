
<template>
  <div class="box">
    <van-row
      class="box_top"
      :style="{
        background: `url(${require('@/assets/img/box/box-bg.png')})`,
      }"
    >
      <van-col span="10" offset="2">
        <h4>我的惠享总收益：<br />￥ <span style="font-size: 35px;color:white">{{userCommission.count}}</span></h4>
      </van-col>
      <van-col span="5" offset="7">
        <span class="box_top_sp" @click="qrCodeShow" style="cursor: pointer; font-size: 15px;"
        >佣金提现</span
        >
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
      <van-col span="9" offset="3" class="box_body_cols">可提现<br />{{userCommission.waitWithdrawal}}</van-col>
      <van-col span="9" offset="3" class="box_body_cols">已提现<br />{{userCommission.finishWithdrawal}}</van-col>
<!--      <van-col span="6" offset="2" class="box_body_cols"-->
<!--        ><span style="cursor: pointer" @click="colMessage">提现中</span-->
<!--        ><br />0</van-col-->
<!--      >-->
    </van-row>
    <van-row v-if="stauts === 1">
      <van-col span="24" style="margin-top: 120px">你的小伙伴呢? ...</van-col>
    </van-row>
    <van-row v-if="stauts === 2" style="font-size: 13px">
      <van-row style="margin: 20px">
        <van-col span="8">达人姓名</van-col>
        <van-col span="8">消费</van-col>
        <van-col span="8">为您带来的收益</van-col>
      </van-row>
      <div v-for="item in teamList" :key="item[0]">
        <van-row style="" class="box_body_data">
          <van-col span="8">{{item.nickName|ellipsis}}</van-col>
          <van-col span="8">￥ {{item.userCount}}</van-col>
          <van-col span="8">￥ {{item.fatherSupport}}</van-col>
        </van-row>
      </div>
    </van-row>
    <van-dialog v-model="show" title="佣金金额大于50元，联系客服进行提现" show-cancel-button>
      <van-image
        width="100%"
        height="100%"
        :src="require('@/assets/img/details/qrcode.jpg')"
      ></van-image>
    </van-dialog>
  </div>
</template>

<script>
import publicJs, {request} from "../../plugins/js/publicJs";

export default {
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 8) {
        return value.slice(0,8) + '...'
      }
      return value
    }
  },

  data() {
    return {
      userId: '',
      userInfo: [],
      teamList: [],
      userCommission: {},
      stauts: 2,
      show: false,
    };
  },
  created() {
    this.userId = localStorage.getItem("userToken");
    this.initUser();
    this.lookTeam();
    this.lookCommission();
  },
  methods: {
    initUser(){
      request({
        url:publicJs.urls.selectUserById + "?id=" +this.userId,
        method:'get',
      }).then(res => {
        this.userInfo = res.data;
      })
    },
    lookTeam(){
      request({
        url:publicJs.urls.selectUserSons + "?fatherId=" +this.userId,
        method:'get',
      }).then(res => {
        if (res.data.length === 0){
          this.status = 1;
        }else {
          this.status = 2;
          this.teamList = res.data;
        }
      })
    },
    lookCommission(){
      request({
        url:publicJs.urls.selectUserCommission + "?userId=" +this.userId,
        method:'get',
      }).then(res => {
        res.data.count = res.data.waitWithdrawal + res.data.finishWithdrawal;
        this.userCommission = res.data;
      })
    },

    spanMessage() {
      this.$dialog.alert({
        title: "收益怎么来的?",
        message: "收益通过....",
      });
    },
    qrCodeShow() {
      this.show = true;
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
