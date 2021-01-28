<!--
 * @description:详情页面
 * @fileName: Details.vue
 * @author: Javi
 * @date: 2020-12-29 17:49:39
 * @version: V1.0
 !-->
<template>
  <div class="deatils">
    <div
      class="deatils_header"
      :style="{
        background: `url(${require('@/assets/img/member/member-bg-top.png')})`,
      }"
    >
      <v-banner :HomeState="false" :Arr="bannerList"></v-banner>
      <div class="deatils_title">
        <p><b>￥{{chooseModel.modelPrice}}</b> <del>门市价：￥{{productInfo.productOriginalPrice}}</del></p>
        <p style="margin-top: 5px">销售{{productInfo.productSaleVolume}}件</p>
      </div>
      <div class="deatils_name">
        <p>
          <b>{{productInfo.productTitle}}</b>
          <span @click="fxs()">
            <van-image
              width="20"
              height="20"
              style="position: relative; top: 3px; right: 5px"
              :src="require('@/assets/img/details/details-icon-share.png')"
            ></van-image>
            <span>分享</span>
          </span>
        </p>
        <p style="color: gray; font-size: 14px; margin: 5px 0 10px 0">
          温馨提示:会员兑换，不退不换，逾期作废
        </p>
        <p>
          <span
            style="
              background: #971818;
              color: white;
              padding: 2px 5px;
              font-size: 13px;
              border-radius: 10px;
            "
            >佣金：{{productInfo.commissionHeigh}}-{{productInfo.allCount}}元</span
          >
          <span style="color: gray; font-size: 13px">库存:{{chooseModel.modelStock}}</span>
        </p>
      </div>
      <van-dialog v-model="fx" show-cancel-button confirm-button-text="保存分享图片" @confirm="saveShare">
        <van-image
          width="100%"
          height="100%"
          :src="share"
        ></van-image>
      </van-dialog>
      <van-dialog v-model="show">
        <van-image
          width="100%"
          height="100%"
          src="https://www.kuadh.com/usr/uploads/2020/11/2114566873.jpg"
        ></van-image>
      </van-dialog>
      <!-- 规格 -->
      <section>
        <header>规格选择</header>
        <article>
          <van-tabs type="line" border style="width: 100%" @click="modelChange">
            <van-tab :title="item.modelName" v-for="item in modelList" :key="item[0]"
                    >{{item.modelDetail}}</van-tab
            >
          </van-tabs>
        </article>
      </section>
      <!-- 店铺信息 -->
      <section class="dp_info">
        <header>店铺信息</header>
        <article>
          <li v-for="item in addressList" :key="item[0]">
            <div @click="navigation(item)">
              <span>
                <van-image
                  width="15"
                  style="margin-right: 5px"
                  height="20"
                  :src="require('@/assets/img/details/details-icon-address.png')"
                ></van-image>
                <span class="custom-title">{{item.storeName}}</span>
              </span>
              <p>{{item.storeAddress}}</p>
            </div>
            <van-image
              width="20"
              height="20"
              @click="phone"
              :src="require('@/assets/img/details/details-icon-phone.png')"
            ></van-image>
          </li>
          <!-- 更多 -->
          <van-collapse v-model="activeName" accordion :border="false" v-if="showAddress">
            <van-collapse-item title="更多" name="1">
              <li v-for="item in moreAddressList" :key="item[0]">
                <div>
                  <span>
                    <van-image
                      width="15"
                      style="margin-right: 5px"
                      height="20"
                      :src="require('@/assets/img/details/details-icon-address.png')"
                    ></van-image>
                    <span class="custom-title">{{item.storeName}}</span>
                  </span>
                  <p>{{item.storeAddress}}</p>
                </div>
                <van-image
                  width="20"
                  height="20"
                  @click="phone"
                  :src="require('@/assets/img/details/details-icon-phone.png')"
                ></van-image>
              </li>
            </van-collapse-item>
          </van-collapse>
        </article>
      </section>
      <!-- 详情 -->
      <section>
        <van-tabs type="line" style="width: 100%">
          <van-tab title="商品介绍">
            <div v-html="html" class="shop_details"></div>
          </van-tab>
        </van-tabs>
      </section>
    </div>
    <footer>
      <van-button type="default" @click="Url('/')" style="witdh: 33%"
        >商城首页</van-button
      >
      <van-button type="default" style="witdh: 33%" @click="userphone"
        >联系客服</van-button
      >
      <van-button type="danger" style="witdh: 33%" @click="buyProduct"
        >立即购买</van-button
      >
    </footer>
    <div style="width: 100%; height: 44px"></div>
  </div>
</template>

<script>
import banner from "../../components/banner";
import publicJs, {request} from "../../plugins/js/publicJs";
import axios from "axios";
export default {
  name: "deatils",
  data() {
    return {
      show: false,
      fx: false,
      share: '',

      activeName: "0",
      bannerList: [{}],
      html: '',
      userId: '',
      storeId: '',
      productId: '',
      modelId: '',
      chooseModel: {},
      userInfo: {},
      superInfo: {},
      productInfo: {},
      modelList: [],
      addressList: [],
      moreAddressList: [],
      visible: false,
      showAddress: false,
      storePhone:'',
    };
  },
  components: {
    "v-banner": banner,
  },
  created() {
    this.userId = localStorage.getItem("userToken");
    // this.userId = 'e9f731b4ca2848b2';
    this.productId = this.$route.params.id;
    this.initUser();
    this.initProdect();
    this.initModel();
    this.initStorePhone();
  },
  methods: {
    initUser(){
      request({
        url:publicJs.urls.selectUserById + "?id=" +this.userId,
        method:'get',
      }).then(res => {
        this.userInfo = res.data;
        this.initSuper();
      })
    },
    initSuper(){
      var date = new Date();
      request({
        url:publicJs.urls.selectByUserId + "?userId=" +this.userId,
        method:'get',
      }).then(res => {
        this.superInfo = res.data;
        var startTime = new Date(Date.parse(res.data.endTime));
        if (startTime < date){
          this.userInfo.userRank = '2';
          this.superInfo.haveNumber = 0;
          request({
            url:publicJs.urls.updateUser,
            method:'post',
            data: this.userInfo
          }).then(res => {
            this.overVip();
          }).catch(err => {
            this.$message.error(res.data)
          })
        }
      })
    },
    overVip(){
      request({
        url:publicJs.urls.overVip + "?userId=" + this.userId,
        method:'get',
      }).then(res => {
      }).catch(err => {
        this.$message.error(res.data)
      })
    },
    initProdect(){
      request({
        url:publicJs.urls.selectProductById + "?id=" + this.productId,
        method:'get',
      }).then(res => {
        var bannerList = [];
        var banner = {};
        banner.img = this.getImg(res.data.productMainImg1);
        banner.link = "/";
        bannerList.push(banner);
        if (res.data.productMainImg2){
          banner = {};
          banner.img = this.getImg(res.data.productMainImg2);
          banner.link = "/";
          bannerList.push(banner);
          if (res.data.productMainImg3){
            banner = {};
            banner.img = this.getImg(res.data.productMainImg3);
            banner.link = "/";
            bannerList.push(banner);
            if (res.data.productMainImg4) {
              banner = {};
              banner.img = this.getImg(res.data.productMainImg4);
              banner.link = "/";
              bannerList.push(banner);
              if(res.data.productMainImg5){
                banner = {};
                banner.img = this.getImg(res.data.productMainImg5);
                banner.link = "/";
                bannerList.push(banner);
              }
            }
          }
        }
        this.bannerList = bannerList;
        res.data.allCount = res.data.commissionLow + res.data.commissionMiddle + res.data.commissionHeigh;
        this.productInfo = res.data;
        this.html = res.data.productDetail;
        this.storeId = res.data.storeId;
        this.initStore();
        this.initStorePhone();
      }).catch(err => {
        this.$message.error("产品初始化错误！！")
      })
    },
    initModel(){
      request({
        url:publicJs.urls.selectModelByProduct + "?productId=" + this.productId,
        method:'get',
      }).then(res => {
        this.chooseModel = res.data[0];
        this.modelList = res.data;
      }).catch(err => {
        this.$message.error("型号初始化错误！！")
      })
    },
    initStore(){
      request({
        url:publicJs.urls.selectAllNormalStore + "?storeId=" +this.storeId,
        method:'get',
      }).then(res => {
        var addressList = [];
        var moreAddressList = [];
        for (let i = 0; i < res.data.length; i++) {
          if (i < 3){
            addressList.push(res.data[i]);
          }else {
            moreAddressList.push(res.data[i]);
            this.showAddress = true;
          }
        }
        this.addressList = addressList;
        this.moreAddressList = moreAddressList;
      })
    },
    initStorePhone(){
      request({
        url:publicJs.urls.selectStoreById + "?id=" + this.storeId,
        method:'get',
      }).then(res => {
        this.storePhone = res.data[0].storePhone;
      })
    },
    buyProduct(){
      //检验是否登录
      if (this.userId){
        //校验是否为会员产品
        if (this.productInfo.productFree === '1'){
          //校验用户是否为会员
          if (this.userInfo.userRank === '1'){
            //校验会员剩余次数
            if (this.superInfo.haveNumber > 0){
              this.$router.push("/order/" + this.userId + "/" + this.storeId + "/" + this.productId + "/" + this.chooseModel.id + "/");
            }else {
              this.$message.warning("您的换购次数不足！！")
            }
          }else {
            this.$message.warning("此产品为会员产品！！")
          }
        }else {
          this.$router.push("/order/" + this.userId + "/" + this.storeId + "/" + this.productId + "/" + this.chooseModel.id + "/");
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
    modelChange(name, title) {
      for (let i = 0; i < this.modelList.length; i++) {
        if (this.modelList[i].modelName === title){
          this.chooseModel = this.modelList[i];
          break;
        }
      }
    },
    //保存分享截图
    saveShare(){
      var alink = document.createElement("a");
      alink.href = this.share;
      alink.download = "picture"; //图片名
      alink.click();
    },
    userphone() {
      this.show = true;
    },
    fxs() {
      if (this.share){
        this.fx = true;
        this.share = this.getImg(this.share);
      }else {
        request({
          url:publicJs.urls.createProductQR + "?qrcodeUrl=" + axios.defaults.baseURL + "/wxLogin/doShareLogin?fatherId=" + this.userId + "%26toPage=details%2F" + this.productInfo.id
          + "&backgroundId=" + this.productInfo.productShareImg,
          method:'get',
        }).then(res => {
          this.share = this.getImg(res.data);
          this.fx = true;
        })
      }
    },
    phone() {
      window.location.href = "tel:" + this.storePhone;
    },
  },
  mounted() {},
};
</script>

<style lang='scss'>
.deatils {
  footer {
    .van-button {
      width: 33.33%;
    }
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    left: 0;
  }
  .van-tabs__content,
  .van-cell__title {
    text-align: left;
  }
  .shop_details {
    img {
      width: 100%;
    }
  }
  .deatils_header {
    width: 100%;
    background-size: 100% 100% !important;
    background-repeat: no-repeat !important;
    background-position-y: -100px !important;
    height: 300px;
    .deatils_title {
      width: 90%;
      margin: 0 auto;
      position: relative;
      top: -5px;
      background: #ffc341;
      display: flex;
      justify-content: space-between;
      p {
        display: flex;
        justify-content: space-between;
        color: white;
        padding: 5px;
        b {
          letter-spacing: 1px;
          font-size: 23px;
        }
        del {
          font-size: 13px;
          margin-left: 5px;
          margin-top: 10px;
        }
      }
    }
    .deatils_name {
      width: 90%;
      margin: 0 auto;
      p {
        b {
          font-size: 20px;
        }
        justify-content: space-between;
        display: flex;
      }
    }
  }
  .dp_info {
    article {
      li {
        justify-content: space-between;
        display: flex;
        margin: 10px 0;
        div {
          span {
            display: flex;
          }
          p {
            color: gray;
            font-size: 13px;
            margin: 10px 0;
          }
        }
      }
    }
  }
}
</style>
