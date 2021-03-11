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
        message: "平台用户服务协议\n" +
          "欢迎您使用【成都惠享生活】的服务，感谢您对【成都惠享生活】的信任与支持！\n" +
          "第一条 总则\n" +
          "1.1 为维护您的权益，请您仔细阅读本《平台用户服务协议》（“本协议”）各条款的具体内容，充分理解其表述的含义。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。\n" +
          "1.2 本协议各条款标题仅为帮助您理解该条款表达的主题之用，不影响或限制该条款的含义或解释。如您对本协议的约定尤其是涉及免除或者责任限制的条款有任何问题，可随时与我们联系，我们将为您进行详细的解释和说明。\n" +
          "1.3 当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序，或者以其他任何方式使用或接受【成都惠享生活】提供的任何平台服务（“服务”，具体含义详见下文的定义条款），即表示您已充分阅读、理解并接受本协议项下的全部条款，并成为【成都惠享生活】平台的“用户”，本协议对您具有法律约束力。在阅读本协议或者以其他任何方式使用或接受【成都惠享生活】提供的任何服务的过程中，如果您不同意本协议全部或其中任何条款约定，您应立即停止注册程序或停止以其他任何方式使用或接受【成都惠享生活】提供的任何服务。\n" +
          "1.4 除非您已阅读并接受本服务协议所有条款，否则您将不能使用【成都惠享生活】提供的任何服务，如您不同意本协议的任意内容，请勿使用【成都惠享生活】的服务。若您以任何方式实际访问、使用或接受了【成都惠享生活】提供的任何服务，则视为您同意并接受本协议的内容，本协议对您具有法律约束力。\n" +
          "1.5 在使用【成都惠享生活】的服务前，您确认已完整阅读并明确知晓本协议的全部内容，且您对本协议中的加粗字体、下划线等重点标示条款已充分理解。\n" +
          "1.6【成都惠享生活】有权根据实际情况不断修订本协议及【成都惠享生活】平台规则，并以在【成都惠享生活】平台公示的形式进行更新和通知，不再单独通知您。经修订的本协议及【成都惠享生活】平台规则一经在【成都惠享生活】平台公示，即对您产生法律约束力效力。如您不同意相关修订内容，请您立即停止使用【成都惠享生活】提供的任何服务。如您在修订事项生效后仍然继续使用【成都惠享生活】平台服务，则视为您已同意并接受生效的变更事项。\n" +
          "第二条 定义\n" +
          "2.1【成都惠享生活】平台：指由{【成都惠享生活】、【成都惠享生活】的关联方或合作方}现在或将来拥有合格权限运营/管理的，享有全部知识产权的，提供特卖活动销售信息等技术服务的网络服务平台、APP客户端及【公众号商城】。\n" +
          "2.2【成都惠享生活】/【成都惠享生活】平台经营者：指【四川耀光纪科技有限公司】。\n" +
          "2.3 商户：指在【成都惠享生活】平台上发布特卖活动销售信息、向您提供商品/服务的自然人、法人和其他组织。\n" +
          "2.4 用户：在【成都惠享生活】平台注册并使用其本人注册的账户，或者以其他任何方式使用或接受【成都惠享生活】平台提供的任何服务，通过【成都惠享生活】平台展示的特卖活动等信息获取商品/服务的个人，或者为任何之目的使用【成都惠享生活】平台相关服务的使用人，在本协议中更多称呼为“您”。\n" +
          "2.5【成都惠享生活】平台服务：【成都惠享生活】作为第三方平台，为各类商户提供各类特卖活动销售信息发布及展示平台，以供您浏览相关信息并与商户达成交易的各项信息技术服务。【成都惠享生活】平台服务仅包含【成都惠享生活】所提供的信息技术服务，【成都惠享生活】平台经营者并不实际参与或提供任何商品/服务的交易。\n" +
          "2.6【成都惠享生活】平台规则：包括在【成都惠享生活】网络服务平台、APP客户端及【公众号商城】等在内的各种形态（包括随着技术发展更新的服务形态）内已经发布及后续发布的全部规则、声明、政策、解读、实施细则、公告等内容。\n" +
          "第三条 协议主体与补充协议\n" +
          "3.1 签约主体\n" +
          "•\t3.1.1 本协议签约主体为您与【成都惠享生活】平台经营者（具体参见本协议的定义条款），本协议对您与【成都惠享生活】平台经营者均具有法律约束力。\n" +
          "•\t3.1.2 本协议项下，【成都惠享生活】平台经营者可能根据【成都惠享生活】平台业务的发展变化而发生变更、新增或减少（合称“变更”）。若发生变更后您仍然使用【成都惠享生活】平台服务的，则视为您同意变更的【成都惠享生活】平台经营者与您共同履行本协议。发生争议时，您可根据您具体使用的服务及对您权益产生影响的具体行为对象确定争议相对方。\n" +
          "3.2 补充协议\n" +
          "•\t3.2.1 由于互联网行业快速发展的特点，本协议并不能完整罗列并覆盖您与【成都惠享生活】所有的权利与义务，亦不能保证完全符合日益发展的新需求。因此，【成都惠享生活】平台公示的平台规则、声明、政策、解读、实施细则、公告和协议等均为本协议的补充协议，为本协议不可分割的一部分且具有同等法律效力。如您使用【成都惠享生活】平台提供的服务，即视为您同意前述补充协议并受其约束。\n" +
          "第四条 账户注册与使用\n" +
          "4.1 用户资格\n" +
          "您知悉并承诺，您具有完全民事权利能力和行为能力，或虽不具有完全民事权利能力和行为能力但已经过您的家长和其他法定监护人同意并由您的家长和其他法定监护人代理注册及使用【成都惠享生活】提供的各项服务。否则，您及您的监护人应依照法律规定承担因此而导致的一切后果。\n" +
          "4.2 注册信息\n" +
          "•\t4.2.1 您应遵循诚实信用、合法善意的原则，向【成都惠享生活】提交相关注册资料、设置会员名、邮箱、手机号码等账户资料（合称“账户名称”）并设置密码（账户名称及密码合称“账户”）。相关注册资料及账户名称应当遵守法律法规、社会主义制度、国家利益、公民合法权益、公序良俗、社会道德风尚和信息真实等原则，不应提交任何违法或不良信息，不得冒用关联机构或社会名人的名义。相关资料如有变动，您应及时更新。\n" +
          "•\t4.2.2 您了解并同意，您有义务保持您提供信息的真实性及有效性。若您所设置的账户名称违反国家法律法规及【成都惠享生活】平台规则的相关管理规定或冒用关联机构或社会名人的名义引起误解或歧义，【成都惠享生活】可对您的账户名称进行暂停使用或注销等处理，并向主管机关报告。\n" +
          "•\t4.2.3 当出现根据国家法律法规规定您需要填写真实身份信息并通过相关验证流程后方可使用相关服务的情形时，您承诺将予以配合。如您填写的身份信息不完整、不真实或未通过验证，导致您无法使用相关服务，造成自身或他人利益损害或其他不良后果的，您应承担相关（法律）责任。\n" +
          "•\t4.2.4 为了确保您的账户安全并便于【成都惠享生活】更好地服务与您，您同意并授权，【成都惠享生活】平台经营者可以根据您提供的手机号码、身份证号码等信息，向全国公民身份号码查询服务中心、电信运营商、金融服务机构等相关单位发起用户身份真实性、用户征信记录、用户手机号码有效性状态等情况的查询。对于您通过平台达成的交易，您同时授权【成都惠享生活】使用或允许经【成都惠享生活】审核许可的第三方在必要、合理的限度内使用您的个人信息，包括但不限于身份信息、账户信息、交易信息等。\n" +
          "•\t4.2.5 您应当及时更新您通过平台提供的信息并确保其真实性、完整性、有效性，并在第一时间同时通知与您达成交易的相关商户。如存在法律法规的明确规定或根据【成都惠享生活】平台经营者的需要，您同意并授权【成都惠享生活】平台经营者检查、核实您的信息。\n" +
          "4.3账户使用\n" +
          "•\t4.3.1 您有权使用您设置或确认的账户登录【成都惠享生活】平台。\n" +
          "•\t4.3.2 您承诺不存在盗用、借用、买入非本人手机号码、电子邮箱等进行注册账户、虚假交易和作弊交易的行为。若您若存在上述违规行为，【成都惠享生活】有权对您采取封停帐号、停止服务的措施，并停止向您提供服务。如您因此给【成都惠享生活】造成损失的，【成都惠享生活】保留追究赔偿及诉至法律途径解决的权利。\n" +
          "•\t4.3.3 通过您的账户所发生的所有行为（包括但不限于在线签署任何协议，浏览、购买、支付、点评、上传、发布、输入任何内容）将视为您本人的真实意思表示。您应对您账户下进行的行为和发生的事件承担相关责任。\n" +
          "•\t4.3.4 您承诺通过平台购买商品/服务系出于自身真实消费之目的。您不得将帐户出借、转让或用作真实消费以外的用途，否则因帐户未妥善保管而造成损失的，您承担相应法律责任，除非有证据证明该出借、转让行为非您主观故意。若您因【成都惠享生活】平台帐户被盗或因其他非您个人的原因造成损失的，您应立即通知【成都惠享生活】并向公安机关报案。当您的账户遭到未经授权的使用时，您应当立即通知【成都惠享生活】平台，否则未经授权的使用行为均视为您本人的行为，您将自行承担所有由此导致的损失及后果。\n" +
          "•\t4.3.5 如您的账户连续超过12个月未登录，【成都惠享生活】有权对该账户进行注销、清理，您的账户将不能再登录【成都惠享生活】平台，相应服务同时终止。【成都惠享生活】在对此类账户进行清理前，将以包括但不限于公告、站内消息、客户端推送信息等方式通知您。\n" +
          "•\t4.3.6 对于您通过本平台达成的交易，您承诺不以任何形式、在任何地点进行以盈利或损害他人利益为目的的转售行为，否则【成都惠享生活】平台经营者有权代商户取消相关交易，并采取注销账户等形式停止向您提供服务。如该等行为对【成都惠享生活】造成不利影响的，您应承担相应的法律责任。\n" +
          "•\t4.3.7 您知悉并同意，在符合法律法规规定或经国家机关要求的前提下，【成都惠享生活】有权对您的账户进行限制或冻结。在该等情况下，您可能无法继续登陆或使用您的账户。\n" +
          "4.4 账户安全\n" +
          "•\t4.4.1 您的账户为您自行设置并由您保管。建议您务必保管好您的账户，并确保您在每个上网时段结束时退出登录【成都惠享生活】平台。\n" +
          "•\t4.4.2 账户因您主动泄露或遭受他人攻击、诈骗等行为导致的损失及后果，均由您自行承担。\n" +
          "•\t4.4.3 如发现任何未经授权使用您账户登录【成都惠享生活】平台或其他可能导致您账户遭窃、遗失的情况，建议您立即通知【成都惠享生活】。您理解【成都惠享生活】对您的任何请求采取行动均需要合理时间，除【成都惠享生活】存在过错外，【成都惠享生活】对在采取行动前已经产生的后果不承担任何责任。\n" +
          "第五条 【成都惠享生活】平台服务\n" +
          "5.1 您知悉并理解，【成都惠享生活】为促进您和商户达成交易的第三方服务平台，仅为您和商户达成交易提供居间服务，并非您实际所购商品/服务交易的相对方。您所购商品/服务的实际提供方为平台交易页面公示的商户，您应根据平台展示的信息独立选择是否与商户达成交易。如您选择与商户达成交易，所购商品/服务的价款将由【成都惠享生活】代商户收取，相应商品/服务的质量、售后保障服务等均由商户负责并承担法律责任。【成都惠享生活】平台经营者公示该等商品/服务的相关信息并不意味着对其进行任何形式的明示或默示的保证或担保。\n" +
          "5.2 您通过【成都惠享生活】点击提交订单并付款成功之后，您即与商户达成交易合同。商户通过【成都惠享生活】向您发放【订单信息】。您知悉【订单信息】不记名、不挂失、不可兑换现金。您负有妥善保管【订单信息】的义务，如因您个人原因导致【订单信息】丢失或者泄露，从而造成您无法消费或未实际消费但【订单信息】已被验证或消费等后果的，您应自行承担相关责任。\n" +
          "5.3 【订单信息】为您要求商户向您提供相应的商品/服务的重要凭证，您应在有效期内持【订单信息】至商户处进行消费。【订单信息】的有效期内，商户有义务按照您确认的订单信息与其在平台发布的商品/服务信息向您提供相关商品/服务，您亦应按照商户发布的信息与要求履行相关权利义务。不在有效期内的【订单信息】不可作为您要求商户提供商品/服务的凭证。\n" +
          "5.4 您通过平台向商户购买的商品/服务的发票、凭证或服务单据，由商户直接向您提供，金额以您实际支付的购买价款为准。【成都惠享生活】并不负有向您提供该等发票、凭证或服务单据的义务。\n" +
          "5.5 您应本着诚实信用的原则与商户交易、消费、点评，不得对所购商品/服务和商户进行虚假评价。您在【成都惠享生活】平台发布的任何信息均仅代表您的个人观点，由您自行独立承担法律责任，与【成都惠享生活】平台无关。若您采取虚构事实、夸张等任何方式恶意诋毁【成都惠享生活】或商户的商誉，【成都惠享生活】可随时注销您的账户、终止对您提供服务，同时您还应承担引发的相关法律责任。\n" +
          "5.6 若您通过平台购买商品/服务后发生消费争议，应第一时间与商户友好协商解决，【成都惠享生活】可予以协助。您知悉并理解，除非法律法规有明确规定，【成都惠享生活】平台经营者不对商户的任何经营行为承担法律责任。\n" +
          "5.7 您同意并授权【成都惠享生活】或【成都惠享生活】授权或认可的第三方商户、广告商通过您使用服务时填写的联系方式向您发送相关商品/服务的促销优惠等商业性信息。您也可以随时通过【成都惠享生活】提供的退订方式进行退订。\n" +
          "5.8 如您在使用平台提供的服务的过程中，或在对所购买的商品/服务进行消费的过程中发现商户存在虚假宣传、误导消费者情形或相关商品/服务信息违反法律法规规定，您可及时向【成都惠享生活】或有关机关举报、投诉，【成都惠享生活】将会在合理时间之内核实、处理，并协助您解决相关问题。\n" +
          "第六条 用户行为规范与责任承担\n" +
          "6.1 在使用【成都惠享生活】平台提供的服务过程中，您同意并承诺遵守《中华人民共和国电信条例》、《中华人民共和国保守国家秘密法》等有关法律、法规、规范性文件的规定。如若【成都惠享生活】有合理相信您的行为可能违反前述规定，则【成都惠享生活】有权立即终止向您提供服务而不需提前通知或取得您的同意。\n" +
          "6.2 您承诺并保证向【成都惠享生活】平台以及商户提供真实、准确、完整、有效的信息，及时予以更新，并特别遵守本协议第四条“账户注册与使用”项下的约定。若因为您的原因导致【成都惠享生活】平台以及商户无法提供服务的，【成都惠享生活】平台以及商户有权暂停向您提供服务，直至您提交正确并经【成都惠享生活】平台以及商户认可的信息。【成都惠享生活】平台并不对因您的行为导致的损失承担责任。\n" +
          "6.3 您承诺并保证认真阅读产品/服务的介绍，自您提交订单并付款成功之后，不得在有效期内任意退换产品/服务。成功抢购产品/服务后，须及时在产品介绍中提及的使用期内预约使用，逾期未使用的，将无法保证能够继续使用本次产品/服务，如您基于不可抗力及其他法律规定的事由不能及时受领产品/服务，您应当向平台提交完整证明材料。【成都惠享生活】会根据产品特性与实际情况与商户确认具体处理方案。\n" +
          "6.4 您应遵守善意且用于自身真实消费的目的使用【成都惠享生活】平台提供的服务，不利用【成都惠享生活】平台谋取不正当利益、侵犯他人合法权益、扰乱【成都惠享生活】平台的正常交易秩序，否则【成都惠享生活】平台有权注销您的账户、终止对您提供服务。\n" +
          "6.5 您承诺并保证您在【成都惠享生活】平台发布的内容（包括您的账户名称等信息）不含有以下内容：\n" +
          "•\t（一）反对宪法所确定的基本原则的；\n" +
          "•\t（二）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；\n" +
          "•\t（三）损害国家荣誉和利益的；\n" +
          "•\t（四）煽动民族仇恨、民族歧视，破坏民族团结，或者侵害民族风俗、习惯的；\n" +
          "•\t（五）破坏国家宗教政策，宣扬邪教和封建迷信的；\n" +
          "•\t（六）散布谣言，扰乱社会秩序，破坏社会稳定的；\n" +
          "•\t（七）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；\n" +
          "•\t（八）侮辱或者诽谤他人，侵害他人合法权益的；\n" +
          "•\t（九）危害社会公德，损害民族优秀文化传统的；\n" +
          "•\t（十）含有法律、行政法规、规范性文件等禁止的其他内容的。\n" +
          "6.6 您理解并保证不进行下列【成都惠享生活】平台禁止的行为，也不允许任何人利用您的账户进行下列行为：\n" +
          "•\t（1）发送任何未经【成都惠享生活】同意或授权的广告推广、宣传资料，或开展任何形式的商业推广活动；\n" +
          "•\t（2）未经【成都惠享生活】明确同意，使用【成都惠享生活】平台服务用于任何商业用途或为任何第三方的利益；\n" +
          "•\t（3）未经【成都惠享生活】明确同意，使用【成都惠享生活】平台以谋取不正当利益，或损害国家、集体或第三人的利益；\n" +
          "•\t（4）不以自身真实消费为目的，采取各种不正当方式大量购买商品/服务以囤积牟利，或大量退货，干扰正常交易秩序，损害商户、其他用户或【成都惠享生活】平台利益；\n" +
          "•\t（5）以“刷单”等不正当方式帮助商户提升商誉，或滥用评价权利对其他用户、商户实施威胁、敲诈勒索；\n" +
          "•\t（6）未经他人明确同意，分享或发布可识别他人个人身份的资料；\n" +
          "•\t（7）以非法入侵服务器、篡改代码等方式损害【成都惠享生活】平台系统，干扰【成都惠享生活】平台的正常运行秩序；\n" +
          "•\t（8）故意传播病毒，破坏网络秩序，损害国家、集体或第三人的利益；\n" +
          "•\t（9）违反任何相关的法律、行政法规、规范性文件、规章、条例等规定，或从事任何侵害国家、集体、第三方以及【成都惠享生活】平台利益的行为 。\n" +
          "6.7 如果您违反前述约定或包含本协议在内的平台规则的约定，【成都惠享生活】平台有权根据实际情况采取封停账户、暂停提供服务、删除违法违规信息、禁止评论、永久封禁账户、注销账户并停止向您提供服务等处理措施。同时，您将承担因此产生的一切责任。如给【成都惠享生活】平台造成不利影响的，您应负责消除影响、恢复名誉，并且赔偿【成都惠享生活】平台经营者因此导致的一切损失，包括且不限于财产损害赔偿、名誉损害赔偿等，承担律师费、诉讼费等因维权产生的合理费用。\n" +
          "第七条 【成都惠享生活】平台的权利义务\n" +
          "7.1 您理解并同意，由于互联网行业快速发展的特点，【成都惠享生活】有权制定并更新【成都惠享生活】的平台规则等，并以【成都惠享生活】平台公示的形式进行通知，不再单独通知您。\n" +
          "7.2 在尽力不对您的使用造成影响的情况下，【成都惠享生活】有权对平台功能进行更新、升级，对相关服务器进行停机维护。若可能影响您使用【成都惠享生活】平台服务的，【成都惠享生活】会提前公告。\n" +
          "7.3【成都惠享生活】平台以及平台经营者应尽力保护您的个人信息，不得随意泄露。\n" +
          "7.4【成都惠享生活】平台有权代商户向您收取商品/服务的购买款。\n" +
          "7.5【成都惠享生活】平台应尽力向您提供持续、稳定、顺畅的服务，维护平台的正常秩序。\n" +
          "7.6【成都惠享生活】有权监督您在平台的交易活动以及您对平台的使用情况。若发现您违反本协议的约定或者相关法律、法规、规范性文件等规定的，【成都惠享生活】有权采取封停账户、暂停提供服务、注销账户并停止向您提供服务等处理措施。\n" +
          "7.7 在任何情形下，对于由于互联网正常的设备维护、网络连接故障、通讯故障、电力故障或其他系统的故障，以及罢工，暴乱，骚乱，灾难性天气（如火灾、洪水、风暴等），爆炸，战争，政府行为，司法行政机关的命令或第三方的不作为而造成的【成都惠享生活】平台不能履行或延迟履行本协议项下服务导致的后果，或者导致您相关信息、记录丢失的情形，【成都惠享生活】平台免于承担责任，但【成都惠享生活】平台应在合理时间内合理协助您处理善后事宜，尽力维护您的经济利益不受（进一步）损害。\n" +
          "第八条 知识产权\n" +
          "8.1 您知悉并同意，除非另有约定或声明，【成都惠享生活】平台内所有内容、技术、软件、数据及其他信息的知识产权及相关权利，均归【成都惠享生活】平台经营者或其关联公司所有，但您依法享有知识产权的除外。未经【成都惠享生活】平台经营者许可，任何人不得擅自使用。\n" +
          "8.2 您承诺并保证，您在使用【成都惠享生活】平台提供的服务时发表的内容（包括但不限于电子文档、文字、图像、图片、音频、视频、图表、版面设计等）未侵犯他人的著作权、商标权等知识产权或其他合法权益，否则【成都惠享生活】平台有权删除相关信息，并采取其他必要合理措施予以制止、规范，同时您应承担全部法律责任。\n" +
          "8.3 您同意，将您发表的上述内容中的非专属、可转让的财产性权利（包括但不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权等），均永久、独家、无偿且不可撤销地许可给【成都惠享生活】平台经营者及其关联公司，使用范围包括但不限于网站、APP客户端、电子杂志、杂志、刊物等，且【成都惠享生活】平台经营者及其关联公司可授权许可第三方进行修改、复制、改编、翻译、汇编或制作，形成改进产品，该改进产品的相关知识产权归【成都惠享生活】平台经营者及其关联公司或其所授权许可的第三方所有。另外，您还同意【成都惠享生活】平台经营者及其关联公司以其自身名义采取法律措施保护前述权利，并获得全部赔偿。\n" +
          "第九条 通知与送达\n" +
          "9.1 您同意【成都惠享生活】以以下合理方式向您送达各类通知：\n" +
          "•\t（1）公示的文案；\n" +
          "•\t（2）【成都惠享生活】平台内消息、弹出消息、客户端推送的消息；\n" +
          "•\t（3）根据您预留于【成都惠享生活】平台的联系方式发出的电子邮件、手机短信、函件等。\n" +
          "9.2 若通过上述第（1）、（2）种方式通知的，则自公示之日起视为送达成功；若通过电子邮件、手机短信通知的，上述信息在发送成功后即视为送达成功；若通过函件通知的，以相关函件邮寄至预留联系地址之日起第五个工作日起，视为送达成功。\n" +
          "9.3 上述送达方式同样可适用于相关仲裁或司法程序（含起诉、审理、执行等各阶段）。\n" +
          "9.4 您应当确认所提供的联系方式真实、准确、有效，并适时更新。如因提供的联系方式不准确或怠于更新等不可归责于【成都惠享生活】平台的原因，导致相关通知、文件、文书无法送达或及时送达的，由您自行承担由此可能产生的法律后果。\n" +
          "第十条 协议的终止\n" +
          "10.1 终止的情形\n" +
          "您有权通过以下任一方式终止本协议：\n" +
          "•\t（1）您自行注销您的账户；\n" +
          "•\t（2）变更事项生效前您停止使用并明示不愿意接受变更事项；\n" +
          "•\t（3）您连续【365天】未使用您的账户或使用【成都惠享生活】平台服务；\n" +
          "•\t（4）您明示不愿意继续使用【成都惠享生活】平台服务，且符合【成都惠享生活】平台经营者认可的终止条件。\n" +
          "•\t（5）与【成都惠享生活】平台经营者协商一致。\n" +
          "出现以下情况时，【成都惠享生活】平台及经营者可以按照本协议第九条所列的方式通知您终止本协议：\n" +
          "•\t（1）您违反本协议约定；\n" +
          "•\t（2）您的行为损害国家、集体、第三人和【成都惠享生活】平台的合法利益；\n" +
          "•\t（3）您的账户被【成都惠享生活】平台合法合规注销；\n" +
          "•\t（4）您违反法律、行政法规、规范性文件等相关规定。\n" +
          "【成都惠享生活】有权根据自身商业安排及发展情况，在经过合理的提前通知程序后，终止全部【成都惠享生活】平台服务。本协议于【成都惠享生活】平台全部服务依法定程序终止之日起终止。\n" +
          "10.2 协议终止后的处理\n" +
          "本协议终止后，【成都惠享生活】平台将停止向您提供服务或履行任何义务，但可保存您留存于【成都惠享生活】平台的内容和信息，除非法律明确规定，【成都惠享生活】无义务向您或您指定的第三方披露您账户中的任何信息（包括未读信息）；对于您在使用【成都惠享生活】平台服务过程中的违约行为，【成都惠享生活】仍可依据本协议向您追究违约责任。\n" +
          "第十一条 法律适用、管辖与其他\n" +
          "11.1 本协议在订立、履行过程中发生的争议均适用中华人民共和国大陆地区法律；如法律无相关规定的，参照商业惯例和/或行业惯例。\n" +
          "11.2 本协议在订立、履行过程中发生的争议，由【成都惠享生活】平台经营者与您协商解决。协商不成时，任何一方均可向被告所在地有管辖权的人民法院提起诉讼。\n" +
          "11.3 本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。\n" +
          "第十二条 其他\n" +
          "12.1 【成都惠享生活】平台规则为本协议不可分割的组成部分，其制定、修订、更新、通知等均适用于本协议的规则与约定，同样对您产生法律约束力。\n" +
          "12.2 若您对本协议有任何问题或建议，请及时在【成都惠享生活】平台公众号中点击底部菜单按钮联系【成都惠享生活】平台\n" +
          "\n" +
          "感谢您的耐心阅读！\n" +
          "\n",
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

