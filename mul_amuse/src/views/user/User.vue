<!--
 * @description:用户中心
 * @fileName: User.vue
 * @author: Javi
 * @date: 2020-12-30 16:16:51
 * @version: V1.0
 !-->
<template>
  <div class="user">
    <van-row
      class="box_top"
      :style="{
        background: `url(${require('@/assets/img/person/person-bg.png')})`,
      }"
    >
    </van-row>
    <div
      class="box_body"
      :style="{
        background: `url(${require('@/assets/img/box/box-bg-card.png')})`,
      }"
      style="padding: 10px 0"
    >
      <van-row>
        <van-col span="2" offset="1" class="box_body_cols">
          <div class="box_avatar">
            <van-image
              style="border: 1px solid white"
              round
              width="70"
              height="70"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            ></van-image>
          </div>
        </van-col>
        <van-col span="16" offset="4" class="box_body_cols">
          <p
            class="van-ellipsis user_title"
            style="display: flex; justify-content: space-between"
          >
            读书看报
            <van-image
              style="margin-top: 3px"
              round
              width="20"
              @click="Url('/address')"
              height="25"
              :src="require('@/assets/img/person/person-icon-address.png')"
            ></van-image>
          </p>
          <p
            class="van-ellipsis"
            style="
              display: flex;
              margin-top: 5px;
              justify-content: space-between;
              font-size: 14px;
              color: gray;
            "
            v-if="userState"
          >
            会员有效期:2088-08-08 剩余次数:6
          </p>
          <p style="color: gray; margin: 5px 0; font-size: 14px">
            惠享体验卡助力进程:0/1
          </p>
          <van-progress
            pivot-text="红色"
            :color="link_color"
            stroke-width="14px"
            :percentage="length"
            :show-pivot="false"
          />
          <router-link to="/" class="router_link" style="float: left"
            >邀请好友</router-link
          >
        </van-col>
      </van-row>
      <van-row>
        <van-col
          span="8"
          offset="3"
          class="box_body_cols_button"
          @click="Url('/card')"
        >
          <van-image
            style="margin-top: 5px; margin-right: 5px"
            round
            width="23"
            height="18"
            :src="require('@/assets/img/person/person-icon-vip.png')"
          ></van-image>
          <p>会员中心</p>
        </van-col>
        <van-col
          span="8"
          offset="2"
          class="box_body_cols_button"
          @click="Url('/box')"
        >
          <van-image
            style="margin-top: 5px; margin-right: 5px"
            round
            width="20"
            height="20"
            :src="require('@/assets/img/person/person-icon-box.png')"
          ></van-image>
          <p>惠享宝箱</p>
        </van-col>
      </van-row>
    </div>
    <van-tabs v-model="active" animated swipeable>
      <van-tab>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text=""
            @load="onLoad"
          >
            <van-card
              v-for="item in list"
              :key="item[0]"
              centered
              desc="视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格"
              :thumb="require('@/assets/img/person/person-pro-cover.png')"
            >
              <template #title>
                <div class="card_title">
                  <b style="font-size: 17px">不二山房</b>
                  <van-image
                    width="40"
                    height="30"
                    style="margin-right: 20px"
                    :src="
                      require('@/assets/img/person/person-icon-done.png')
                    "
                  ></van-image>
                </div>
              </template>
              <template #num>
                <p>
                  订单价:<span style="font-size: 16px; color: black">328</span
                  >元
                </p>
              </template>
              <template #footer>
                <van-button size="small" round>核销码</van-button>
                <van-button size="small" round>再次购买</van-button>
              </template>
            </van-card>
          </van-list>
          <van-divider v-show="finished">我是有底线的</van-divider>
        </van-pull-refresh>
        <template slot="title">
          <van-image
            width="50"
            height="50"
            :src="require('@/assets/img/person/person-icon-allorder.png')"
          ></van-image>
          <p>全部订单</p>
        </template>
      </van-tab>
      <van-tab>
         <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text=""
            @load="onLoad"
          >
            <van-card
              v-for="item in list"
              :key="item[0]"
              centered
              desc="视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格"
              :thumb="require('@/assets/img/person/person-pro-cover.png')"
            >
              <template #title>
                <div class="card_title">
                  <b style="font-size: 17px">不二山房</b>
                  <van-image
                    width="40"
                    height="30"
                    style="margin-right: 20px"
                    :src="
                      require('@/assets/img/person/person-icon-done.png')
                    "
                  ></van-image>
                </div>
              </template>
              <template #num>
                <p>
                  订单价:<span style="font-size: 16px; color: black">328</span
                  >元
                </p>
              </template>
              <template #footer>
                <van-button size="small" round>核销码</van-button>
                <van-button size="small" round>再次购买</van-button>
              </template>
            </van-card>
          </van-list>
          <van-divider v-show="finished">我是有底线的</van-divider>
        </van-pull-refresh>
        <template slot="title">
          <van-image
            width="50"
            height="50"
            :src="require('@/assets/img/person/person-icon-payoff.png')"
          ></van-image>
          <p>已支付</p>
        </template>
      </van-tab>
      <van-tab>
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text=""
            @load="onLoad"
          >
            <van-card
              v-for="item in list"
              :key="item[0]"
              centered
              desc="视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格"
              :thumb="require('@/assets/img/person/person-pro-cover.png')"
            >
              <template #title>
                <div class="card_title">
                  <b style="font-size: 17px">不二山房</b>
                  <van-image
                    width="40"
                    height="30"
                    style="margin-right: 20px"
                    :src="
                      require('@/assets/img/person/person-icon-done.png')
                    "
                  ></van-image>
                </div>
              </template>
              <template #num>
                <p>
                  订单价:<span style="font-size: 16px; color: black">328</span
                  >元
                </p>
              </template>
              <template #footer>
                <van-button size="small" round>核销码</van-button>
                <van-button size="small" round>再次购买</van-button>
              </template>
            </van-card>
          </van-list>
          <van-divider v-show="finished">我是有底线的</van-divider>
        </van-pull-refresh>
        <template slot="title">
          <van-image
            width="50"
            height="50"
            :src="require('@/assets/img/person/person-icon-appointed.png')"
          ></van-image>
          <p>已预约</p>
        </template>
      </van-tab>
      <van-tab>
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text=""
            @load="onLoad"
          >
            <van-card
              v-for="item in list"
              :key="item[0]"
              centered
              desc="视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格视频规格"
              :thumb="require('@/assets/img/person/person-pro-cover.png')"
            >
              <template #title>
                <div class="card_title">
                  <b style="font-size: 17px">不二山房</b>
                  <van-image
                    width="40"
                    height="30"
                    style="margin-right: 20px"
                    :src="
                      require('@/assets/img/person/person-icon-done.png')
                    "
                  ></van-image>
                </div>
              </template>
              <template #num>
                <p>
                  订单价:<span style="font-size: 16px; color: black">328</span
                  >元
                </p>
              </template>
              <template #footer>
                <van-button size="small" round>核销码</van-button>
                <van-button size="small" round>再次购买</van-button>
              </template>
            </van-card>
          </van-list>
          <van-divider v-show="finished">我是有底线的</van-divider>
        </van-pull-refresh>
        <template slot="title">
          <van-image
            width="50"
            height="50"
            :src="require('@/assets/img/person/person-icon-doneorder.png')"
          ></van-image>
          <p>已完成</p>
        </template>
      </van-tab>
    </van-tabs>
    <v-footer :active="2"></v-footer>
  </div>
</template>

<script>
import footer from "../../components/footer";
export default {
  name: "user",
  data() {
    return {
      active: 0,
      userState: true, //会员状态
      length: 0,
      link_color: "white", //#cb0e0e 进度条颜色
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
    "v-footer": footer,
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
  mounted() {},
};
</script>

<style lang='scss'>
.user {
  .card_title {
    display: flex;
    justify-content: space-between;
  }
  .van-tabs__wrap {
    height: 100px;
  }
  .van-card__content {
    text-align: left;
  }
  .van-tab__text--ellipsis {
    display: block;
    overflow: hidden;
  }
  .box_top {
    width: 100%;
    background-size: 100% 100% !important;
    background-repeat: no-repeat !important;
    background-position-y: -100px !important;
    color: #ffffff;
    text-align: left;
    height: 250px;
    padding-top: 20px;
  }
  .box_body {
    background-size: 100% 100% !important;
    background-repeat: no-repeat !important;
    margin: 0 10px;
    margin-top: -180px;
    .box_body_cols {
      text-align: left;
    }
    .box_body_cols_button {
      display: flex;
      padding: 10px 0;
      justify-content: center;
      p {
        font-size: 18px;
      }
    }
    .box_avatar {
      position: relative;
      border-radius: 100%;
      bottom: 20px;
      position: relative;
    }
    .user_title {
      font-size: 20px;
    }
    .van-progress {
      width: 60%;
      margin-right: 5px;
      float: left;
    }
    .router_link {
      position: relative;
      bottom: 4px;
      left: 5px;
      font-size: 14px;
      color: #cb0e0e;
    }
  }
}
</style>

