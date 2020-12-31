<template>
  <div>
    <a-row>
      <a-col :offset="5">
        <a-card :title="defaultReceive.receiveName?defaultReceive? defaultReceive.receiveName+'，'+defaultReceive.receivePhone+'，'+defaultReceive.receiveAddress : '请选择地址':''"
                style="width: 1000px">
          <a slot="extra" @click="openReceive" v-if="defaultReceive.receiveName">选择地址</a>
          <a-descriptions bordered>
            <a-descriptions-item label="产品名称">
              {{productInfo.productTitle}}
            </a-descriptions-item>
            <a-descriptions-item label="型号">
              {{modelInfo.modelName}}
            </a-descriptions-item>
            <a-descriptions-item label="单价" v-if="this.productInfo.productFree === '0'">
              {{productInfo.productNowPrice}}
            </a-descriptions-item>
          </a-descriptions>
          <el-form :inline="true" :model="orderInfo" class="demo-form-inline" style="margin-top: 40px;">
            <el-form-item label="备注">
              <el-input v-model="orderInfo.orderRemark"></el-input>
            </el-form-item>
            <el-form-item label="数量" v-if="this.productInfo.productFree === '0'">
              <el-input-number v-model="orderInfo.orderCount" @change="handleChange" :min="1" :max="modelInfo.modelStock"></el-input-number>
            </el-form-item>
            <el-form-item label="总价" v-if="this.productInfo.productFree === '0'">
              <el-input v-model="orderInfo.orderPrice" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" style="color: white;" :disabled="waitResult">付款</el-button>
            </el-form-item>
          </el-form>
        </a-card>
      </a-col>
    </a-row>
    <a-modal v-model="receiveVisible" title="我的地址" centered :width="1500">
      <a-radio-group size="large">
        <a-radio-button :value="item.id" v-for="item in receiveInfo" :key="item.id" @click="chooseReceive(item)">
          {{item.receiveName}}， {{item.receivePhone}}， {{item.receiveAddress}}
        </a-radio-button>
      </a-radio-group>
    </a-modal>
  </div>
</template>

<script>
import publicJs, {request} from "../../plugins/js/publicJs";
import axios from "axios";

export default {
  data: () => ({
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
      orderCount: '',
      orderPrice: 0
    }
  }),
  created() {
    this.userId = this.$route.params.userId;
    this.storeId = this.$route.params.storeId;
    this.productId = this.$route.params.productId;
    this.modelId = this.$route.params.modelId;
    this.initStore();
    this.initProduct();
    this.initModel();
  },
  methods: {
    initReceive(){
      request({
        url:publicJs.urls.selectUserReceive + "?userId=" + this.userId,
        method:'get',
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].defaultStatus === "1"){
            this.defaultReceive = res.data[i];
            break;
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
        this.orderInfo.orderPrice = res.data.productNowPrice;
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
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },

    openReceive(){
      this.receiveVisible = true;
    },
    chooseReceive(item){
      this.defaultReceive = item;
      this.receiveVisible = false;
    },

    handleChange(){
      this.orderInfo.orderPrice = this.orderInfo.orderCount * this.productInfo.productNowPrice;
    },
    onSubmit() {
      this.waitResult = true;
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
            this.orderInfo.receiveId = this.defaultReceive.id;
          }
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
        }else {
          alert("库存已被清空！！！")
        }
      })
    },
    submitOrder(){
      if (this.productInfo.productFree === "1"){
        request({
          url:publicJs.urls.insertFreeOrder,
          method:'post',
          data: this.orderInfo
        }).then(res => {
          this.$router.push("/index");
          this.$message.success("下单成功！！")
        }).catch(err => {
          this.$message.error(err.data)
        })
      }else {
        request({
          url:publicJs.urls.insertOrder,
          method:'post',
          data: this.orderInfo
        }).then(res => {
          this.$router.push("/index");
          this.$message.success("下单成功！！")
        }).catch(err => {
          this.$message.error(err.data)
        })
      }
    }
  },
}
</script>

<style scoped>

</style>
