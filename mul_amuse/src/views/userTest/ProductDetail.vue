<template>
  <div>
  <a-row>
    <a-col :offset="10">
      <a-card hoverable style="width: 350px">
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
        <a-list item-layout="horizontal" :data-source="addressList">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a slot="actions" @click="navigation(item)">详情</a>
            <a-list-item-meta :description="item.storeAddress">
              <a slot="title" href="https://www.antdv.com/">{{ item.storeName }}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
        <a-divider />
        <a-card-meta :title="productInfo.productTitle"></a-card-meta>
        <a-radio-group default-value="a" button-style="solid" style="margin-top: 10px;">
          <a-radio-button v-for="item in modelList" :value="item.id" :key="item.id" @click="bindId(item.id)" :disabled="item.modelStock === 0">
            {{item.modelName}}
          </a-radio-button>
        </a-radio-group>
        <a-divider />
        详情页
      </a-card>
    </a-col>
  </a-row>
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
    userInfo: {},
    superInfo: {},
    productInfo: {},
    modelList: [],
    addressList: [],
    visible: false,
  }),
  created() {
    this.userId = localStorage.getItem("userToken");
    this.productId = this.$route.params.productId;
    this.initUser();
    this.initSuper();
    this.initProdect();
    this.initModel();
  },
  methods: {
    initUser(){
      request({
        url:publicJs.urls.selectUserById + "?id=" +this.userId,
        method:'get',
      }).then(res => {
        this.userInfo = res.data;
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
        this.initStore();
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
    initStore(){
      request({
        url:publicJs.urls.selectAllNormalStore + "?storeId=" +this.storeId,
        method:'get',
      }).then(res => {
        this.addressList = res.data;
      })
    },
    bindId(id){
      this.modelId = id;
    },
    buyProduct(){
      if (this.modelId === ''){
        this.$message.warning("请选择型号！！")
        return;
      }
      //检验是否登录
      if (this.userId){
        //校验是否为会员产品
        if (this.productInfo.productFree === '1'){
          //校验用户是否为会员
          if (this.userInfo.userRank === '1'){
            //校验会员剩余次数
            if (this.superInfo.haveNumber > 0){
              this.$router.push("/orderSubmit/" + this.userId + "/" + this.storeId + "/" + this.productId + "/" + this.modelId + "/");
            }else {
              this.$message.warning("您的换购次数不足！！")
            }
          }else {
            this.$message.warning("此产品为会员产品！！")
          }
        }else {
          this.$router.push("/orderSubmit/" + this.userId + "/" + this.storeId + "/" + this.productId + "/" + this.modelId + "/");
        }
      }else {
        this.visible = true;
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
    navigation(item){
      var url = 'http://api.map.baidu.com/direction?origin=四川科技馆&' +
        'destination=latlng:' + item.latitude +',' + item.longitude + '|name:' + item.storeName +
        '&mode=driving&region=成都&output=html&src=webapp.baidu.openAPIdemo';
      window.location = url;
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
