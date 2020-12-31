<template>
  <a-button type="primary" @click="initTest">
    成功
  </a-button>
</template>

<script>
  import axios from 'axios'
  import publicJs, {request} from "../../plugins/js/publicJs";

  export default {
    data() {
      return {
        orderInfo:{
          orderPrice: 0.01,
          openid: '',
        }
      };
    },
    created() {
    },
    methods:{
      initTest(){
        // request({
        //   url:publicJs.urls.shareCreateQR + "?qrcodeUrl=" + axios.defaults.baseURL + "/wxLogin/doLogin?toPage=index",
        //   method:'post',
        // }).then(res => {
        //   console.log(res);
        // })
        this.orderInfo.openid = localStorage.getItem("openId");
        var self = this;
        request({
          url:publicJs.urls.checkOrder,
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
                  alert('支付成功');
                  //支付成功后跳转的页面
                  self.$router.push("/index");
                }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                  alert('支付取消');
                }else if(res.err_msg == "get_brand_wcpay_request:fail"){
                  alert('支付失败');
                  WeixinJSBridge.call('closeWindow');
                } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
              });
          })
        })
      }
    }
  };
</script>

<style scoped>

</style>
