<!--
 * @description:会员专区页面
 * @fileName: Member.vue
 * @author: Javi
 * @date: 2020-12-29 14:21:24
 * @version: V1.0
 !-->
<template>
  <div class="member">
    <div
      class="member_header"
      :style="{
        background: `url(${require('@/assets/img/member/member-bg-top.png')})`,
      }"
    >
      <v-banner :HomeState="false" :Arr="bannerList"></v-banner>
    </div>
    <!-- 会员享用 -->
    <section>
      <header>
        <van-image
          width="25"
          height="25"
          :src="require('@/assets/img/member/member-icon-v.png')"
        />
        <label>会员享用</label>
      </header>
      <article class="member_center">
        <ul>
          <li v-for="item in productOne" :key="item[0]" @click="Url('/details/' + item.id)">
            <van-image
              width="100%"
              :src="item.productSpecialImg"
            ></van-image>
            <div class="member_center_footer">
              <div class="member_center_footer_left">
                <label>{{item.productTitle}}</label>
                <p>{{item.productSubtitle}}</p>
              </div>
              <div class="member_center_footer_right">
                <del>￥{{item.productOriginalPrice}}</del>
                <b>￥{{item.productVipPrice}}</b>
              </div>
            </div>
          </li>
        </ul>
      </article>
    </section>
    <!-- 会员享用结束 -->
    <!-- 惠享免费 -->
    <section>
      <header>
        <van-image
          width="25"
          height="25"
          :src="require('@/assets/img/member/member-icon-free.png')"
        />
        <label>惠享免费</label>
      </header>
      <article class="member_isFrr">
        <ul>
          <li v-for="item in productTwo" :key="item[0]" @click="Url('/details/' + item.id)">
            <van-image
              width="100%"
              height="100%"
              :src="item.productSpecialImg"
            ></van-image>
            <div class="member_isFrr_footer">
              <div class="member_isFrr_footer_one">
                <label>{{item.productTitle}}</label>
                <del>￥{{item.productOriginalPrice}}</del>
              </div>
              <div class="member_isFrr_footer_two">
                <p class="van-ellipsis">
                  {{item.productSubtitle}}
                </p>
              </div>
            </div>
          </li>
          <div style="clear: both"></div>
        </ul>
      </article>
    </section>
    <!-- 惠享免费结束 -->
    <v-advertisement></v-advertisement>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-if="productList.length > 0"
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
        <section
          class="member_mf"
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
          <div class="member_mf_footer">
            <p class="member_mf_footer_left">
              <b>￥{{item.productVipPrice}}</b>
              <del>门市价：￥{{item.productOriginalPrice}}</del>
            </p>
            <p>已兑：{{item.productSaleVolume}}</p>
          </div>
        </section>
      </van-list>
      <van-divider v-show="finished">我是有底线的</van-divider>
    </van-pull-refresh>

    <v-footer :active="active" v-if="undestroy"></v-footer>
  </div>
</template>

<script>
import banner from "../../components/banner";
import footer from "../../components/footer";
import advertisement from "../../components/advertisement";
import publicJs, {request} from "../../plugins/js/publicJs";
import axios from "axios";
export default {
  name: "member",
  data() {
    return {
      userId: '',
      nowDate: '',
      userInfo: {},
      productList:[],
      productOne:[],
      productTwo:[],
      flag: 0,

      bannerList: [
        {
          img: require("@/assets/img/member/member-banner-poster1.png"),
          link: "/my",
        },
        {
          img: require("@/assets/img/member/member-banner-poster1.png"),
          link: "/my",
        },
      ],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      active:1,
      undestroy:true,
    };
  },
  components: {
    "v-banner": banner,
    "v-footer": footer,
    "v-advertisement": advertisement,
  },

  activated() {
    this.undestroy = true
  },
  deactivated() {
    this.undestroy = false;
  },

  created() {
    this.userId = localStorage.getItem("userToken");
    // this.userId = 'e9f731b4ca2848b2';
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
        this.initProduct();
      })
    },
    initProduct(){
      request({
        url:publicJs.urls.selectSuperProduct + "?userId=" + this.userInfo.id,
        method:'get',
      }).then(res => {
        var vipOne = [];
        var vipTwo = [];
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].productCoverImg = this.getImg(res.data[i].productCoverImg);
          res.data[i].saleTime = this.nowDate > res.data[i].productSaleTime;
          if (res.data[i].productSpecial === '1'){
            res.data[i].productSpecialImg = this.getImg(res.data[i].productSpecialImg);
            vipOne.push(res.data[i]);
          }
          if (res.data[i].productSpecial === '2'){
            res.data[i].productSpecialImg = this.getImg(res.data[i].productSpecialImg);
            vipTwo.push(res.data[i]);
          }
        }
        this.productList = res.data;
        this.productOne = vipOne;
        this.productTwo = vipTwo;
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
.member {
  .member_header {
    width: 100%;
    background-size: 100% 100% !important;
    background-repeat: no-repeat !important;
    background-position-y: -100px !important;
  }
  .member_center {
    width: 100%;
    overflow-x: scroll;

    ul {
      width: 1080px;
      display: flex;
      overflow: hidden;

      li {
        width: 180px;
        margin: 0 5px;
        .member_center_footer {
          display: flex;
          justify-content: space-between;
          .member_center_footer_left {
            display: block;
            text-align: left;
            label {
              font-weight: bold;
              font-size: 14px;
            }
            p {
              color: gray;
              font-size: 9px;
            }
          }
          .member_center_footer_right {
            text-align: right;
            del {
              display: block;
              font-size: 12px;
              color: gray;
            }
            b {
              font-size: 15px;
              color: rgb(168, 11, 11);
            }
          }
        }
      }
    }
  }
  .member_isFrr {
    ul {
      li {
        width: 48%;
        margin: 1% 1%;
        float: left;
        .member_isFrr_footer {
          .member_isFrr_footer_one {
            display: flex;
            justify-content: space-between;
            del {
              font-size: 14px;
              color: rgb(168, 11, 11);
            }
            label {
              font-weight: 400;
              font-size: 14px;
            }
          }
          .member_isFrr_footer_two {
            p {
              font-weight: 300;
              color: gray;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  .member_mf {
    p {
      text-align: left;
      span {
        color: rgb(139, 8, 8);
      }
    }
    .member_mf_footer {
      display: flex;
      justify-content: space-between;
      .member_mf_footer_left {
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
