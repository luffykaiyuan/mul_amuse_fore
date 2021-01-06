<template>
  <div class="order">
    <div class="order_body">
      <v-addressList v-if="status === 1"></v-addressList>
      <v-addressForm
        v-if="status === 2"
        v-on:childInput="childInput"
      ></v-addressForm>
      <van-row style="text-align: left; margin-top: 10px" class="shop">
        <van-col span="24" style="margin-bottom: 20px"> 商品信息 </van-col>
        <van-col span="6"
          ><div
            style="
              height: 70px;
              width: 70px;
              cursor:pointer;
              user-select: none;
            "
          >
            <img
              src="../../assets/img/order/order-pro-cover.png"
              width="100%"
              height="100%"
            /></div
        ></van-col>
        <van-col span="18"><xmp><商品名></xmp></van-col>
      </van-row>
      <van-row style="text-align: left" class="shop">
        <van-col span="10">两瓶装</van-col>
        <van-col span="14" style="text-align: right; margin-bottom: 20px"
          >￥66.6</van-col
        >
        <van-col span="6">购买数量</van-col>
        <van-col span="18" style="text-align: right">
          <input
            value="-"
            type="button"
            @click="reduce"
            :disabled="reduce_btn"
            class="btn"
          />
          <span class="num_span">{{ number }}</span>
          <input value="+" type="button" @click="plus" class="btn" />
        </van-col>
      </van-row>
      <van-row style="margin-top: 12px; margin-left: 15px">
        <van-checkbox
          v-model="checked"
          icon-size="16"
          class="checkBox"
          @change="Change"
          ><span :style="{ color: spColor }">我已阅读并同意</span>
        </van-checkbox>
        <span class="user_agr" @click="Message">《平台用户服务协议》</span>
      </van-row>
    </div>
    <div class="order_bottom">
      <p style="padding-left: 20px; padding-right: 20px">
        <van-icon
          name="warning"
          color="#971818"
          size="15px"
          style="margin-right: 5px"
        />购买即为认同产品使用规则,无正当理由不可退改,如遇使用问题可咨询客服
      </p>
      <van-row class="footer">
        <van-col span="16" class="footer_num"
          >小计:<span class="footer_money"> ￥66.66</span></van-col
        >
        <van-col span="8" style="text-align: right"
          ><van-button
            class="wxzf_btn"
            :disabled="wxzfDisabled"
            :color="wxzfColor"
            >微信支付</van-button
          ></van-col
        >
      </van-row>
    </div>
  </div>
</template>
<style lang="scss">
.order {
  position: relative;
  text-align: left;
  .btn {
    font-size: 22px;
    background: rgb(238, 236, 236);
    border: none;
    color: #000;
    width: 50px;
    height: 30px;
  }
  .btn[disabled] {
    color: rgb(177, 176, 176);
    background: #f1eeee;
  }
  .van-checkbox__icon--round .van-icon {
    border-color: rgb(173, 171, 171);
    border-radius: 0%;
  }
  .top_img {
    display: none;
  }
  .van-checkbox__icon--checked .van-icon {
    color: red;
    background-color: #f5f5f5;
    border-color: #000;
    border-radius: 0%;
  }
  .shop {
    color: #000;
    background: #ffffff;
    padding: 15px;
  }
  .order_bottom {
    position: absolute;
    width: 100%;
    bottom: 0px;
    color: #000000;
    font-size: 15px;
  }
  .footer {
    height: 70px;
    background-color: #fff;
    margin-top: 10px;
  }
  .wxzf_btn {
    border: none;
    width: 120px;
    height: 70px;
    user-select: none;
  }
  .footer_num {
    line-height: 40px;
    padding: 10px;
  }
  .footer_money {
    color: #971818;
    font-size: 24px;
  }
  .checkBox {
    float: left;
  }
  .user_agr {
    color: #971818;
    float: left;
    cursor: pointer;
    user-select: none;
  }
  .num_span {
    font-size: 20px;
    margin: 0 8px 0 8px;
  }
  .van-button--disabled {
    background: #8a8a8a !important;
  }
}
</style>
<script>
import addressList from "../../components/addressList";
import addressForm from "../../components/addressForm";
export default {
  components: {
    "v-addressList": addressList,
    "v-addressForm": addressForm,
  },

  data() {
    return {
      checked: false,
      status: 2,
      wxzfDisabled: true,
      wxzfColor: "#09bb07",
      spColor: "rgb(173, 171, 171)",
      number: 1,
      reduce_btn: true,
    };
  },
  methods: {
    plus() {
      this.number += 1;
      this.reduce_btn = false;
    },
    reduce() {
      this.number -= 1;
      if (this.number == 1) {
        this.reduce_btn = true;
      }
    },
    childInput(data) {
      var result = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(
        data[3]
      );
      if (
        data[0] == false &&
        data[1] == false &&
        data[2] == false &&
        result &&
        data[4] !== ""
      ) {
        this.addressForm = true;
      } else {
        this.addressForm = false;
      }
      if (this.addressForm && this.checked) {
        this.wxzfDisabled = false;
      } else {
        this.wxzfDisabled = true;
      }
    },
    Message() {
      this.$dialog.alert({
        title: "平台用户协议",
        message: "...",
      });
    },

    Change() {
      if (this.spColor !== "#000000") {
        this.spColor = "#000000";
      } else {
        this.spColor = "rgb(173, 171, 171)";
      }
      if (this.status == 2) {
        if (this.addressForm && this.checked) {
          this.wxzfDisabled = false;
        } else {
          this.wxzfDisabled = true;
        }
      } else {
        if (this.checked) {
          this.wxzfDisabled = false;
        } else {
          this.wxzfDisabled = true;
        }
      }
    },
  },
  mounted() {
    document.getElementsByClassName("order")[0].style.height =
      window.innerHeight + "px";
    console.log(window.innerHeight);
  },
};
</script>

