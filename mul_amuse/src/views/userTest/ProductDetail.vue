<template>
  <div>
  <a-row>
    <a-col :offset="10">
      <a-card hoverable style="width: 300px">
        <a-carousel style="margin-bottom: 10px;">
          <div v-if="productInfo.productMainImg1">
            <img slot="cover" alt="example" :src="productInfo.productMainImg1" style="width: 100%; height: 300px;"/>
          </div>
          <div v-if="productInfo.productMainImg2">
            <img slot="cover" alt="example" :src="productInfo.productMainImg2" style="width: 100%; height: 300px;"/>
          </div>
          <div v-if="productInfo.productMainImg3">
            <img slot="cover" alt="example" :src="productInfo.productMainImg3" style="width: 100%; height: 300px;"/>
          </div>
          <div v-if="productInfo.productMainImg4">
            <img slot="cover" alt="example" :src="productInfo.productMainImg4" style="width: 100%; height: 300px;"/>
          </div>
          <div v-if="productInfo.productMainImg5">
            <img slot="cover" alt="example" :src="productInfo.productMainImg5" style="width: 100%; height: 300px;"/>
          </div>
        </a-carousel>
        <template slot="actions" class="ant-card-actions">
          <a-button type="primary" html-type="submit" style="color: white" @click="buyProduct">
            <a-icon type="tag" />立即购买
          </a-button>
        </template>
        <a-card-meta :title="productInfo.productTitle">
        </a-card-meta>
        <a-radio-group default-value="a" button-style="solid" style="margin-top: 10px;">
          <a-radio-button v-for="item in modelList" :value="item.id" :key="item.id" @click="bindId(item.id)">
            {{item.modelName}}
          </a-radio-button>
        </a-radio-group>
        <a-divider />
        详情页
      </a-card>
    </a-col>
  </a-row>
  <a-modal v-model="visible" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
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
    productInfo: {},
    modelList: [],
    visible: false,
  }),
  created() {
    this.userId = localStorage.getItem("userToken");
    this.productId = this.$route.params.productId;
    this.initProdect();
    this.initModel();
  },
  methods: {
    initProdect(){
      request({
        url:publicJs.urls.selectProductById + "?id=" + this.productId,
        method:'get',
      }).then(res => {
        res.data.productMainImg1 = this.getImg(res.data.productMainImg1);
        res.data.productMainImg2 = this.getImg(res.data.productMainImg2);
        res.data.productMainImg3 = this.getImg(res.data.productMainImg3);
        res.data.productMainImg4 = this.getImg(res.data.productMainImg4);
        res.data.productMainImg5 = this.getImg(res.data.productMainImg5);
        this.productInfo = res.data;
        this.storeId = res.data.storeId;
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },
    initModel(){
      request({
        url:publicJs.urls.selectModelByProduct + "?productId=" + this.productId,
        method:'get',
      }).then(res => {
        this.modelList = res.data;
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },
    bindId(id){
      this.modelId = id;
    },
    buyProduct(){
      if (this.userId){
        this.$router.push("/orderSubmit/" + this.userId + "/" + this.storeId + "/" + this.productId + "/" + this.modelId + "/");
      }else {
        this.visible = true;
      }
    },
    handleOk(e) {
      this.$router.push("/login");
      this.visible = false;
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
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 300px;
  line-height: 300px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
