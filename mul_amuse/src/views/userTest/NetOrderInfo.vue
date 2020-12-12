<template>
  <a-descriptions title="订单信息" bordered>
    <a-descriptions-item label="订单编号">
      {{orderInfo.orderNumber}}
    </a-descriptions-item>
    <a-descriptions-item label="商家名称">
      {{productInfo.storeName}}
    </a-descriptions-item>
    <a-descriptions-item label="核销码">
      {{orderInfo.qrcodeNumber}}
    </a-descriptions-item>
    <a-descriptions-item label="产品标题">
      {{orderInfo.productTitle}}
    </a-descriptions-item>
    <a-descriptions-item label="产品现价">
      {{productInfo.productNowPrice}}
    </a-descriptions-item>
    <a-descriptions-item label="型号">
      {{orderInfo.modelName}}
    </a-descriptions-item>
    <a-descriptions-item label="数量">
      {{orderInfo.orderCount}}
    </a-descriptions-item>
    <a-descriptions-item label="总价">
      {{orderInfo.orderPrice}}
    </a-descriptions-item>
    <a-descriptions-item label="下单时间">
      {{orderInfo.addTime}}
    </a-descriptions-item>
  </a-descriptions>
</template>


<script>
import publicJs, {request} from "../../plugins/js/publicJs";
import axios from "axios";

export default {
  data: () => ({
    orderNumber: '',
    productId: '',
    orderInfo: {},
    productInfo: {},
  }),
  created() {
    this.orderNumber = this.$route.params.orderNumber;
    this.initOrder();
  },
  methods: {
    initOrder(){
      request({
        url:publicJs.urls.selectOrderByNum + "?orderNumber=" + this.orderNumber,
        method:'get',
      }).then(res => {
        this.productId = res.data[0].productId;
        this.orderInfo = res.data[0];
        this.initProdect();
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },
    initProdect(){
      request({
        url:publicJs.urls.selectProductById + "?id=" + this.productId,
        method:'get',
      }).then(res => {
        this.productInfo = res.data;
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },
  },
}
</script>

<style scoped>

</style>
