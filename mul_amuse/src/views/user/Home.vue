<!--
 * @description:首页
 * @fileName: Home.vue
 * @author: Javi
 * @date: 2020-12-29 10:39:00
 * @version: V1.0
 !-->
<template>
  <div class="home">
    <!-- 轮播图 -->
    <v-banner :Arr="bannerList"></v-banner>
    <!-- 优惠限时购 -->
    <section class="home_time">
      <header>
        <van-image
          style="top: 5px"
          width="20"
          height="20"
          :src="require('@/assets/img/home/home-icon-crown.png')"
        />
        <label>惠享限时购</label>
        <!-- 倒计时 -->
        <van-count-down :time="time" format="HH:mm:ss" class="desc_time">
          <template #default="timeData">
            <span class="block">{{ timeData.hours }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </header>
      <article>
        <van-image
          @click="Url('/details/' + specialOneBig.id)"
          width="100%"
          height="100%"
          :src="specialOneBig.productSpecialImg"
        />
        <div class="home_center_footer">
          <div class="home_center_footer_left">
            <b>{{specialOneBig.storeName}}</b>
            <p class="van-ellipsis">价值 <span>{{specialOneBig.productNowPrice}}元</span>的{{specialOneBig.productTitle}}</p>
          </div>
          <van-button
            round
            @click="Url('/details/' + specialOneBig.id)"
            size="mini"
            color="#b11123"
            style="margin: 10px 0"
            >立即抢购</van-button
          >
        </div>
      </article>
    </section>
    <main>
      <section>
        <article>
          <van-image
            width="100%"
            height="100%"
            @click="Url('/details/' + specialOne[0].id)"
            :src="specialOne[0].productSpecialImg"
          />
          <div class="home_center_footer">
            <div class="home_center_footer_left">
              <b>{{specialOne[0].storeName}}</b>
              <p class="van-ellipsis">价值 <span>{{specialOne[0].productNowPrice}}元</span>的{{specialOne[0].productTitle}}</p>
            </div>
            <van-button
              round
              @click="Url('/details/' + specialOne[0].id)"
              color="#b11123"
              size="mini"
              style="margin: 10px 0"
              >立即抢购</van-button
            >
          </div>
        </article>
      </section>
      <section>
        <article>
          <van-image
            width="100%"
            height="100%"
            @click="Url('/details/' + specialOne[1].id)"
            :src="specialOne[1].productSpecialImg"
          />
          <div class="home_center_footer">
            <div class="home_center_footer_left">
              <b>{{specialOne[1].storeName}}</b>
              <p class="van-ellipsis">价值 <span>{{specialOne[1].productNowPrice}}元</span>的{{specialOne[1].productTitle}}</p>
            </div>
            <van-button
              round
              @click="Url('/details/' + specialOne[1].id)"
              color="#b11123"
              size="mini"
              style="margin: 10px 0"
              >立即抢购</van-button
            >
          </div>
        </article>
      </section>
    </main>
    <!-- 优惠限时购结束 -->
    <!-- 品牌推荐 -->
    <section class="home_recommend">
      <header>
        <van-image
          width="20"
          height="20"
          style="top: 7px"
          :src="require('@/assets/img/home/home-icon-recommend.png')"
        />
        <label>品牌推荐</label>
      </header>
      <home-banner></home-banner>
    </section>
    <!-- 品牌推荐结束 -->
    <v-advertisement></v-advertisement>
    <!-- 惠享优选 -->
    <section>
      <header>
        <van-image width="20" height="20" style="top: 7px" :src="require('@/assets/img/home/home-icon-recommend.png')"/>
        <label>惠享优选</label>
      </header>
    </section>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

        <van-list
          v-model="loading"
          :finished="finished"
          finished-text=""
          @load="onLoad"
        >
          <section
            class="hx_recommend"
            @click="Url('/details/' + item.id)"
            v-for="item in list"
            :key="item[0]"
          >
            <van-image
              width="100%"
              height="100%"
              :src="item.productCoverImg"
            ></van-image>
            <p>
            <span>{{item.productTitle}}</span
            >{{item.productSubtitle}}
            </p>
            <div class="hx_recommend_footer">
              <p class="hx_recommend_footer_left">
                <b>￥{{item.productVipPrice}}</b>
                <del>门市价：￥{{item.productOriginalPrice}}</del>
                <span>返{{item.commissionHeigh}}￥-{{item.allCount}}￥</span>
              </p>
              <p>销售量：{{item.productSaleVolume}}</p>
            </div>
          </section>
        </van-list>
        <van-divider v-show="finished">我是有底线的</van-divider>

      </van-pull-refresh>

      <div style="clear: both"></div>
    <!-- 惠享优选结束 -->
    <v-footer :active="0"></v-footer>
  </div>
</template>

<script>
import banner from "../../components/banner";
import footer from "../../components/footer";
import advertisement from "../../components/advertisement";
import home_banner from "../../components/home_banner";
import publicJs, {request} from "../../plugins/js/publicJs";
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      productList: [],
      flag: 0,
      specialOneBig: {},
      specialOne: [{productSpecialImg: ''}, {productSpecialImg: ''}],

      time: 30 * 60 * 60 * 1000,
      bannerList: [
        {
          img: require("@/assets/img/home/home-banner-poster1.png"),
          link: "true",
        },
        {
          img: require("@/assets/img/home/home-banner-poster1.png"),
          link: "true",
        },
      ],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  components: {
    "v-banner": banner,
    "v-footer": footer,
    "v-advertisement": advertisement,
    "home-banner": home_banner,
  },
  created() {
    this.initProduct();
  },
  methods: {
    initProduct(){
      this.flag = 0;
      request({
        url:publicJs.urls.selectIndexProduct,
        method:'get',
      }).then(res => {
        var specialOne = [];
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].saleTime = this.nowDate > res.data[i].productSaleTime;
          res.data[i].productCoverImg = this.getImg(res.data[i].productCoverImg);
          res.data[i].allCount = res.data[i].commissionLow + res.data[i].commissionMiddle + res.data[i].commissionHeigh;
          if (res.data[i].productSpecial === '3' && res.data[i].productSpecialStatus === '1'){
            res.data[i].productSpecialImg = this.getImg(res.data[i].productSpecialImg);
            this.specialOneBig = res.data[i];
          }
          if (res.data[i].productSpecial === '4' && res.data[i].productSpecialStatus === '1'){
            res.data[i].productSpecialImg = this.getImg(res.data[i].productSpecialImg);
            specialOne.push(res.data[i]);
          }

        }
        this.productList = res.data;
        this.specialOne = specialOne;
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

    onLoad() {
      console.log(true);
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        var overFlag = this.flag + 4;
        for (let i = this.flag; i < overFlag; i++, this.flag++) {
          if (i >= this.productList.length){
            break;
          }
          this.list.push(this.productList[i]);
        }
        this.loading = false;

        if (this.list.length >= this.productList.length) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style lang='scss'>
  @import "../../plugins/css/userScss";
.home {
  .home_time {
    margin-top: 45px;
    .desc_time {
      margin-left: 10px;
      margin-top: 5px;
      .colon {
        display: inline-block;
        margin: 0 3px;
        color: black;
      }
      .block {
        display: inline-block;
        width: 22px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background-color: #b11123;
      }
    }
    .home_center_footer {
      display: flex;
      justify-content: space-between;
      .home_center_footer_left {
        text-align: left;
        b {
          font-size: 18px;
          margin: 0;
        }
        p {
          margin: 0;
        }
        span {
          font-size: 14px;
          font-weight: bold;
          color: #b11123;
        }
      }
    }
  }
  main {
    display: flex;
    section:nth-child(1) {
      padding: 0 1% 0 2.5%;
    }
    section:nth-child(2) {
      padding: 0 2.5% 0 1%;
    }
    .home_center_footer {
      display: flex;
      justify-content: space-around;
      .home_center_footer_left {
        b {
          font-size: 16px;
          margin: 0;
        }
        p {
          letter-spacing: 0px;
          font-size: 9px;
          margin: 0;
        }
        text-align: left;
      }
    }
  }
  // 优选
  .hx_recommend {
    p {
      text-align: left;
      span {
        color: rgb(139, 8, 8);
      }
    }
    .hx_recommend_footer {
      display: flex;
      justify-content: space-between;
      .hx_recommend_footer_left {
        display: flex;
        b {
          color: rgb(173, 14, 14);
          font-size: 18px;
          margin-right: 5px;
        }
        del {
          color: gray;
          margin-top: 5px;
          font-size: 13px;
        }
        span {
          border-radius: 5px;
          font-size: 13px;
          height: 20px;
          margin-top: 5px;
          margin-left: 5px;
          padding: 0 2.5px;
          background: rgb(248, 185, 11);
          color: black;
        }
        justify-content: space-between;
      }
    }
  }
  section {
    label {
      font-size: 17px;
    }
  }
}
</style>
