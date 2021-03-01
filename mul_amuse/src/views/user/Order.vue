<template>
  <div class="order">
    <div class="order_body">
      <div class="body" v-if="status === 1 && productInfo.productType === '1'" @click="chooseReceive">
        <div class="address_top">
          <van-icon
            name="cross"
            style="float:left;"
            class="top_img"
          />
        </div>
        <div class="address_body">
          <van-icon name="location" class="address_location" />
          <span id="name">{{defaultReceive.receiveName}}---</span><span id="phone">{{defaultReceive.receivePhone}}</span><br />
          <span id="area">{{defaultReceive.receiveArea}}/{{defaultReceive.receiveAddress}}</span>
          <van-icon name="arrow" style="float: right;"/>
        </div>
      </div>
      <van-popup v-model="receiveShow" position="bottom" :style="{ height: '70%' }" >
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell :title="item.receiveName" clickable v-for="item in receiveInfo" @click="radio = item.id">
              {{item.receiveArea}}/{{item.receiveAddress}}
              <template #right-icon>
                <van-radio :name="item.id" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <van-button type="info" style="margin: 20px; float: right;" @click="sureRecive">确认</van-button>
      </van-popup>
      <v-addressForm
        v-if="status === 2 && productInfo.productType === '1'"
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
              :src="productInfo.productCoverImg"
              width="100%"
              height="100%"
            /></div
        ></van-col>
        <van-col span="18"><xmp>{{productInfo.productTitle}}</xmp></van-col>
      </van-row>
      <van-row style="text-align: left" class="shop">
        <van-col span="10">{{modelInfo.modelName}}</van-col>
        <van-col span="14" style="text-align: right; margin-bottom: 20px"
          >￥{{modelInfo.modelPrice}}</van-col
        >
        <van-col span="6" v-if="productInfo.productFree === '0'">购买数量</van-col>
        <van-col span="18" style="text-align: right" v-if="productInfo.productFree === '0'">
          <input value="-" type="button" @click="reduce" :disabled="reduce_btn" class="btn"/>
          <span class="num_span">{{ orderInfo.orderCount }}</span>
          <input value="+" type="button" @click="plus" class="btn" :disabled="plus_btn"/>
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
        <van-col span="16" class="footer_num" v-if="productInfo.productFree === '0'">
          小计:<span class="footer_money"> ￥{{orderInfo.orderPrice}}</span>
        </van-col>
        <van-col span="16" class="footer_num" v-else>
          小计:<span class="footer_money"> ￥<del>{{orderInfo.orderPrice}}</del></span>
        </van-col>
        <van-col span="8" style="text-align: right"
          ><van-button
            class="wxzf_btn"
            :disabled="wxzfDisabled"
            :color="wxzfColor"
            @click="sselectSubmit"
            >微信支付</van-button
          ></van-col
        >
      </van-row>
    </div>
    <van-dialog v-model="vipVisible" show-cancel-button title="温馨提示"
                message="会员产品为免费兑换产品，兑换后不得退换，您确定要消耗一次次数兑换此产品吗？" @confirm="onSubmit">
    </van-dialog>
  </div>
</template>
<style lang="scss">
.order {
  position: relative;
  text-align: left;
  overflow-wrap: break-word;
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
<script>
import addressList from "../../components/addressList";
import addressForm from "../../components/addressForm";
import publicJs, {request} from "../../plugins/js/publicJs";
import axios from "axios";
export default {
  components: {
    "v-addressList": addressList,
    "v-addressForm": addressForm,
  },
  created() {
    this.userId = this.$route.params.userId;
    this.storeId = this.$route.params.storeId;
    this.productId = this.$route.params.productId;
    this.modelId = this.$route.params.modelId;
    this.initStore();
    this.initProduct();
    this.initModel();
  },
  data() {
    return {
      userId: '',
      storeId: '',
      productId: '',
      modelId: '',
      waitResult: false,

      receiveInfo: [],
      storeInfo: {},
      productInfo: {},
      modelInfo: {},

      defaultReceive:{},
      receiveVisible: false,

      orderInfo: {
        orderRemark: '',
        orderCount: 1,
        orderPrice: 0.0
      },

      checked: false,
      status: 1,
      wxzfDisabled: true,
      wxzfColor: "#09bb07",
      spColor: "rgb(173, 171, 171)",
      number: 1,
      reduce_btn: true,
      plus_btn: false,
      receiveShow: false,
      vipVisible: false,
      radio: 1,
    };
  },
  methods: {
    initReceive(){
      request({
        url:publicJs.urls.selectUserReceive + "?userId=" + this.userId,
        method:'get',
      }).then(res => {
        if (res.data.length === 0){
          this.status = 2;
        }else {
          this.status = 1;
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].defaultStatus === "1"){
              this.defaultReceive = res.data[i];
              break;
            }
          }
        }
        this.receiveInfo = res.data;
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },
    initStore(){
      request({
        url:publicJs.urls.selectStoreById + "?id=" + this.storeId,
        method:'get',
      }).then(res => {
        this.storeInfo = res.data;
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },
    initProduct(){
      request({
        url:publicJs.urls.selectProductById + "?id=" + this.productId,
        method:'get',
      }).then(res => {
        this.orderInfo.productImg = res.data.productCoverImg;
        res.data.productCoverImg = this.getImg(res.data.productCoverImg);
        if (res.data.productType === "1"){
          this.initReceive()
        }
        this.productInfo = res.data;
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },
    initModel(){
      request({
        url:publicJs.urls.selectOneModel + "?id=" + this.modelId,
        method:'get',
      }).then(res => {
        this.modelInfo = res.data;
        res.data.modelPrice = parseFloat(res.data.modelPrice);
        this.orderInfo.orderPrice = res.data.modelPrice;
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },

    openReceive(){
      this.receiveVisible = true;
    },
    /*chooseReceive(item){
      this.defaultReceive = item;
      this.receiveVisible = false;
    },*/

    handleChange(){
    },
    sselectSubmit(){
      if (this.productInfo.productFree === '1'){
        this.vipVisible = true;
      }else {
        this.onSubmit();
      }
    },
    onSubmit() {
      this.wxzfDisabled = true;
      this.orderInfo.userId = this.userId;
      this.orderInfo.storeId = this.storeId;
      this.orderInfo.productId = this.productId;
      this.orderInfo.productType = this.productInfo.productType;
      this.orderInfo.productTitle = this.productInfo.productTitle;
      this.orderInfo.modelId = this.modelId;
      this.orderInfo.modelName = this.modelInfo.modelName
      this.orderInfo.openid = localStorage.getItem("openId");
      var self = this;
      request({
        url:publicJs.urls.checkOrder,
        method:'post',
        data: this.orderInfo
      }).then(res => {
        if (res.data){
          if (this.orderInfo.productType === "1"){
            if (this.status === 2){
              this.defaultReceive.userId = this.userId;
              request({
                url:publicJs.urls.insertReceive,
                method:'post',
                data: this.defaultReceive,
              }).then(res => {
                this.orderInfo.receiveId = res.data;
              })
            }else {
              this.orderInfo.receiveId = this.defaultReceive.id;
            }
          }
          if (this.productInfo.productFree === "1"){
            request({
              url:publicJs.urls.insertFreeOrder,
              method:'post',
              data: this.orderInfo
            }).then(res => {
              this.$router.push("/home");
              this.$message.success("下单成功！！")
            }).catch(err => {
              this.$message.error(err.data)
            })
          }else {
            //this.payOrder();
            request({
              url:publicJs.urls.orders,
              method:'get',
            }).then(res => {
              WeixinJSBridge.invoke( 'getBrandWCPayRequest', {
                  "appId":res.data.appId,     //公众号名称,由商户传入
                  "timeStamp":res.data.timeStamp,         //时间戳,自1970年以来的秒数
                  "nonceStr":res.data.nonceStr, //随机串
                  "package":res.data.package,
                  "signType":res.data.signType,         //微信签名方式：
                  "paySign":res.data.paySign //微信签名
                },
                function(res){
                  if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    //支付成功后的操作
                    self.submitOrder();
                  }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                    alert('支付取消');
                  }else if(res.err_msg == "get_brand_wcpay_request:fail"){
                    alert('支付失败');
                    WeixinJSBridge.call('closeWindow');
                  } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
                });
            })
          }
        }else {
          alert("库存已被清空！！！")
        }
      })
    },
    /*payOrder(){
      request({
        url:publicJs.urls.orders,
        method:'get',
      }).then(res => {
        WeixinJSBridge.invoke( 'getBrandWCPayRequest', {
            "appId":res.data.appId,     //公众号名称,由商户传入
            "timeStamp":res.data.timeStamp,         //时间戳,自1970年以来的秒数
            "nonceStr":res.data.nonceStr, //随机串
            "package":res.data.package,
            "signType":res.data.signType,         //微信签名方式：
            "paySign":res.data.paySign //微信签名
          },
          function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
              //支付成功后的操作
              self.submitOrder();
            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
              alert('支付取消');
            }else if(res.err_msg == "get_brand_wcpay_request:fail"){
              alert('支付失败');
              WeixinJSBridge.call('closeWindow');
            } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
          });
      }).catch((err) => {
        console.log(err);
      })
    },*/

    submitOrder(){
      request({
        url:publicJs.urls.insertOrder,
        method:'post',
        data: this.orderInfo
      }).then(res => {
        this.$router.push("/home");
        this.$message.success("下单成功！！")
      }).catch(err => {
        this.$message.error(err.data)
      })
    },
    //图片获取路径拼接
    getImg(id){
      if (id){
        return axios.defaults.baseURL + publicJs.urls.selectFile + "?id=" + id;
      } else {
        return "";
      }
    },
    plus() {
      this.orderInfo.orderCount += 1;
      this.orderInfo.orderPrice = (this.orderInfo.orderCount * parseFloat(this.modelInfo.modelPrice)).toFixed(2);
      if (this.orderInfo.orderCount >= this.modelInfo.modelStock){
        this.plus_btn = true;
      }
      this.reduce_btn = false
    },
    reduce() {
      this.orderInfo.orderCount -= 1;
      this.orderInfo.orderPrice = (this.orderInfo.orderCount * parseFloat(this.modelInfo.modelPrice)).toFixed(2);
      if (this.orderInfo.orderCount === 1) {
        this.reduce_btn = true;
      }
      this.plus_btn = false;
    },
    chooseReceive(){
      this.radio = this.defaultReceive.id;
      this.receiveShow = true;
    },
    sureRecive(){
      for (let i = 0; i < this.receiveInfo.length; i++) {
        if (this.receiveInfo[i].id === this.radio){
          this.defaultReceive = this.receiveInfo[i];
          this.receiveShow = false;
          break;
        }
      }
    },

    childInput(data) {
      this.defaultReceive.receiveName = data[4];
      this.defaultReceive.receivePhone = data[3];
      this.defaultReceive.receiveArea = data[5];
      this.defaultReceive.receiveAddress = data[6];
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

