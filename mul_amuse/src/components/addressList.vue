<template>
  <div class="addressList">
    <div class="body" v-for="item in receiveList">
      <div class="address_top">
        <van-icon
          name="cross"
          style="float:left;"
          class="top_img"
          @click="Message(item)"
        />
<!--        <van-icon-->
<!--          @click="linkNewAddress(item)"-->
<!--          name="arrow"-->
<!--          style="float: right"-->
<!--          class="top_img"-->
<!--        />-->
      </div>
      <div class="address_body">
        <van-icon name="location" class="address_location" />
        <span id="name">{{item.receiveName}}</span><span id="phone">{{item.receivePhone}}</span><br />
        <span id="area">{{item.receiveArea}}/{{item.receiveAddress}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import publicJs, {request} from "../plugins/js/publicJs";

export default {
  data() {
    return {
      userId: '',
      receiveList: [],
    };
  },
  created() {
    this.userId = localStorage.getItem("userToken");
    this.getReceive();
  },
  methods: {
    getReceive(){
      request({
        url:publicJs.urls.selectReceiveList + "?userId=" +this.userId,
        method:'get',
      }).then(res => {
        this.receiveList = res.data;
      })
    },

    linkNewAddress(item) {
      this.$router.push({ path: "/newAddress"});
    },
    Message(item) {
      this.$dialog
        .confirm({
          message: "是否删除地址",
        })
        .then(() => {
          item.status = '0';
          request({
            url:publicJs.urls.updateReceive,
            method:'post',
            data: item,
          }).then(res => {
            this.$message.success("删除成功！");
            this.getReceive();
          })
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="scss">
.addressList {

  margin-bottom: 8px;
  .top {
    background-color: #f5f5f5;
  }
  #name {
    font-size: 16px;
    font-weight: bold;
    margin-right: 6px;
  }
  #phone {
    color: #9e9e9e;
  }
  .body {
    background: #ffffff;
    height: 95px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
  }
  .address_top {
    height: 20px;
  }
  .address_location {
    float: left;
    font-size: 40px;
    line-height: 50px;
    color: #971818;
  }
  .top_img {
    color: #9e9e9e;
    font-size: 18px;
  }
  .address_body {
    text-align: left;
    font-size: 13px;
  }
}
</style>
