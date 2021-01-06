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
          @click="Url('/details/1')"
          width="100%"
          height="100%"
          :src="require('@/assets/img/home/home-cover1.png')"
        />
        <div class="home_center_footer">
          <div class="home_center_footer_left">
            <b>贤合庄火锅</b>
            <p class="van-ellipsis">价值 <span>360元</span>的贤合双人餐</p>
          </div>
          <van-button
            round
            @click="Url('/details/1')"
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
            @click="Url('/details/1')"
            :src="require('@/assets/img/home/home-cover1.png')"
          />
          <div class="home_center_footer">
            <div class="home_center_footer_left">
              <b>贤合庄火锅</b>
              <p class="van-ellipsis">价值 <span>360元</span>的贤合双人餐</p>
            </div>
            <van-button
              round
              @click="Url('/details/1')"
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
            @click="Url('/details/1')"
            :src="require('@/assets/img/home/home-cover1.png')"
          />
          <div class="home_center_footer">
            <div class="home_center_footer_left">
              <b>贤合庄火锅</b>
              <p class="van-ellipsis">价值 <span>360元</span>的贤合双人餐</p>
            </div>
            <van-button
              round
              @click="Url('/details/1')"
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
    <section class="home_Optimization">
      <header>
        <van-image
          width="20"
          height="20"
          style="top: 7px"
          :src="require('@/assets/img/home/home-icon-recommend.png')"
        />
        <label>惠享优选</label>
      </header>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text=""
          @load="onLoad"
        >
          <article
            v-for="item in list"
            :key="item[0]"
            @click="Url('/details/1')"
          >
            <van-image width="100%" height="100%" :src="item.img"></van-image>
            <label class="van-ellipsis" style="font-size: 18px"
              >贤合庄火锅</label
            >
            <p class="van-multi-ellipsis--l2">
              贤合庄火锅贤合庄火锅贤合庄火锅贤合庄火锅贤合庄火锅贤合庄火锅
            </p>
            <p style="display: flex; justify-content: space-between">
              <b>￥199</b> <del>￥699</del>
              <span>已售:699</span>
            </p>
            <span class="bq">返05￥-10￥</span>
          </article>
        </van-list>
        <van-divider v-show="finished">我是有底线的</van-divider>

      </van-pull-refresh>

      <div style="clear: both"></div>
    </section>
    <!-- 惠享优选结束 -->
    <v-footer :active="0"></v-footer>
  </div>
</template>

<script>
import banner from "../../components/banner";
import footer from "../../components/footer";
import advertisement from "../../components/advertisement";
import home_banner from "../../components/home_banner";
export default {
  name: "home",
  data() {
    return {
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
      list: [
        {
          img: require("@/assets/img/home/home-cover1.png"),
          title: "贤合庄火锅",
          desc: "贤合庄火锅贤合庄火锅贤合庄火锅贤合庄火锅贤合庄火锅贤合庄火锅",
          price: 199,
          noprice: 699,
          toprice: 30,
        },
        {
          img: require("@/assets/img/home/home-procover.png"),
          title: "贤合庄火锅",
          desc: "贤合庄火锅贤合庄火锅贤合庄火锅贤合庄火锅贤合庄火锅贤合庄火锅",
          price: 199,
          noprice: 699,
          toprice: 30,
        },
      ],
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
  methods: {
    onLoad() {
      console.log(true);
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 4; i++) {
          this.list.push({
            img: require("@/assets/img/home/home-procover.png"),
            title: "贤合庄火锅",
            desc:
              "贤合庄火锅贤合庄火锅贤合庄火锅贤合庄火锅贤合庄火锅贤合庄火锅",
            price: 199,
            noprice: 699,
            toprice: 30,
          });
        }
        this.loading = false;

        if (this.list.length >= 10) {
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
  .home_Optimization {
    .van-list {
      column-count: 2;
      column-gap: 10px;
    }
    article {
      background: white;
      padding: 1%;
      width: 100%;
      height: 100%;
      .bq {
        border-radius: 5px;
        font-size: 13px;
        height: 20px;
        margin-top: 5px;
        margin-left: 5px;
        padding: 0 2.5px;
        background: rgb(248, 185, 11);
        color: black;
      }
      label {
        font-weight: bold;
        font-size: 18px;
      }
      p {
        font-size: 14px;
        color: gray;
      }
      b {
        color: #b11123;
        font-size: 18px;
      }
      del {
        color: gray;
        font-size: 14px;
        margin-top: 3px;
      }
      span {
        font-size: 13px;
        margin-top: 2px;
      }
      text-align: left;
    }
  }
}
</style>
