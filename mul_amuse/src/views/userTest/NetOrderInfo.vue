<template>
  <div>
    <van-nav-bar
      title="订单详情"
    />
    <van-card
      :num="orderInfo.orderCount"
      :price="orderInfo.orderPrice"
      :desc="modelInfo.modelName"
      :title="productInfo.productTitle"
      :thumb="productInfo.productCoverImg">
      <template #tags>
        <van-tag plain type="danger" v-if="orderInfo.status === '1'">待核销</van-tag>
        <van-tag plain type="success" v-else>已核销</van-tag>
      </template>
      <template #footer>
        <van-button v-if="orderInfo.status === '1'" @click="shouVisible">核销订单</van-button>
      </template>
    </van-card>
    <van-dialog v-model="finishVisible" title="确认核销"
                message="确认核销此订单吗？" show-cancel-button @confirm="finishOrder">
    </van-dialog>
  </div>
</template>


<script>
import publicJs, {request} from "../../plugins/js/publicJs";
import axios from "axios";

export default {
  data: () => ({
    qrcodeNumber: '',
    productId: '',
    modelId: '',
    storeId: '',
    orderInfo: {},
    productInfo: {},
    modelInfo: {},

    finishVisible: false
  }),
  created() {
    this.qrcodeNumber = this.$route.params.orderNumber;
    this.storeId = localStorage.getItem("userToken");
    this.initOrder();
  },
  methods: {
    initOrder(){
      request({
        url:publicJs.urls.selectOrderByNum + "?orderNumber=" + this.qrcodeNumber,
        method:'get',
      }).then(res => {
        this.productId = res.data[0].productId;
        this.modelId = res.data[0].modelId;
        this.orderInfo = res.data[0];
        this.initProdect();
        this.initModel();
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },
    initProdect(){
      request({
        url:publicJs.urls.selectProductById + "?id=" + this.productId,
        method:'get',
      }).then(res => {
        res.data.productCoverImg = this.getImg(res.data.productCoverImg);
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
    shouVisible(){
      this.finishVisible = true;
    },
    finishOrder(){
      if (this.storeId === this.orderInfo.storeId){
        request({
          url:publicJs.urls.destoryCodeNumber + "?qrcodeNumber=" + this.qrcodeNumber,
          method:'get',
        }).then(res => {
          this.initOrder();
          this.$message.success("核销成功！！")
        }).catch(err => {
          this.$message.error(err.data)
        })
      }else {
        this.$message.error("请在正确的店铺核销商品！！！")
      }
    },
    //图片获取路径拼接
    getImg(id){
      if (id){
        return axios.defaults.baseURL + publicJs.urls.selectFile + "?id=" + id;
      } else {
        return "";
      }
    },
  },
}
</script>

<style scoped>

</style>
