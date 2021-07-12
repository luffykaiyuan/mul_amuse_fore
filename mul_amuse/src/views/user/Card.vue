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
      <div v-for="item in supersetInfo" :key="item.id">
        <van-image
          width="100%"
          height="100%"
          :src="item.imgAddress"
          @click="weChatPay(item)"
        ></van-image>
<!--        <van-button color="#1f1f1f" round @click="weChatPay(item)"-->
<!--          >立即购买</van-button-->
<!--        >-->
      </div>
    </section>
  </div>
</template>

<script>
import publicJs, {request} from "../../plugins/js/publicJs";
import axios from "axios";

export default {
  name: "Card",
  data() {
    return {
      userId: '',
      nowDate: '',
      userInfo: {},
      inviteInfo: {},
      superInfo: {},
      supersetInfo: [{}],
      moreInfo: [{}],
      productList: [{}],

      superSet: false,
      vipInfo: {},
      vipForm: {},
      orderInfo: {},

      moreSet: false,
      moreItemInfo: {}};
  },
  created() {
    this.userId = localStorage.getItem("userToken");
    var myDate = new Date();
    this.nowDate = myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate();
    this.initUser();
  },
  methods: {
    initUser(){
      request({
        url:publicJs.urls.selectUserById + "?id=" +this.userId,
        method:'get',
      }).then(res => {
        this.userInfo = res.data;
        if (this.userInfo.userRank === '0'){
          this.initInvite();
          this.initSuperSet();
        } else if (this.userInfo.userRank === '1'){
          this.$toast({
            type:"fail",
            message:'这儿是成为新会员的地方，你已是会员，\n 再见！',
            onClose:()=>{
              this.$router.push('/member')
            }
          })
          //this.initSuper();
          //this.initSuperMore();
        }else {
          this.initSuperSet();
        }
      })
    },
    initInvite(){
      request({
        url:publicJs.urls.selectInvite + "?userId=" +this.userId,
        method:'get',
      }).then(res => {
        this.inviteInfo = res.data;
      })
    },
    initSuper(){
      request({
        url:publicJs.urls.selectByUserId + "?userId=" +this.userId,
        method:'get',
      }).then(res => {
        this.superInfo = res.data;
      })
    },
    initSuperSet(){
      request({
        url:publicJs.urls.selectAllSet,
        method:'get',
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].imgAddress = this.getImg(res.data[i].imgAddress);
        }
        this.supersetInfo = res.data;
        console.log(this.supersetInfo)
      })
    },
    getImg(id){
      if (id){
        return axios.defaults.baseURL + publicJs.urls.selectFile + "?id=" + id;
      } else {
        return "";
      }
    },
    initSuperMore(){
      request({
        url:publicJs.urls.selectAllMore,
        method:'get',
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].imgAddress = this.getImg(res.data[i].imgAddress);
        }
        this.moreInfo = res.data;
        console.log(this.moreInfo)
      })
    },

    weChatPay(item){
      this.orderInfo.orderPrice = item.supervipPrice;
      this.orderInfo.openid = localStorage.getItem("openId");
      var self = this;
      request({
        url:publicJs.urls.checkOrderVIP,
        method:'post',
        data: this.orderInfo
      }).then(res => {
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
                self.becomeVIP(item);
              }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                alert('支付取消');
              }else if(res.err_msg == "get_brand_wcpay_request:fail"){
                alert('支付失败');
                WeixinJSBridge.call('closeWindow');
              } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
            });
        })
      })
    },

    becomeVIP(item){
      console.log(item);
      let startDate = new Date();
      let endDate = new Date();
      endDate.setDate(startDate.getDate() + item.haveDay);
      var y = endDate.getFullYear();
      var m = (endDate.getMonth() < 10 ? "0" + (endDate.getMonth() + 1).toString() : endDate.getMonth() + 1);
      var d = (endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate());
      this.vipForm.userId = this.userId;
      this.vipForm.haveNumber = item.haveNumber;
      this.vipForm.endTime = y + "-" + m + "-" + d;

      if (this.userInfo.userRank === '0'){
        request({
          url: publicJs.urls.insertSuperVIP,
          method: 'post',
          data: this.vipForm
        }).then(res => {
          this.$message.success("恭喜您成为超级会员！！");
        }).catch(err => {
          this.$message.error(res.data)
        })
      }else {
        request({
          url: publicJs.urls.updateSuperVIP,
          method: 'post',
          data: this.vipForm
        }).then(res => {
          this.$message.success("恭喜您成为超级会员！！");
        }).catch(err => {
          this.$message.error(res.data)
        })
      }
      this.userInfo.userRank = "1";
      this.updateUser(this.userInfo)
    },

    updateUser(userInfo){
      request({
        url: publicJs.urls.updateUser,
        method: 'post',
        data: userInfo
      }).then(res => {
        this.initUser();
      }).catch(err => {
        this.$message.error(res.data)
      })
    }
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
