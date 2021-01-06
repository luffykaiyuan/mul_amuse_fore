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
          style="top: 3px"
          :src="require('@/assets/img/member/member-icon-v.png')"
        />
        <label>会员享用</label>
      </header>
      <article class="member_center">
        <ul>
          <li v-for="item in 6" :key="item[0]" @click="Url('/')">
            <van-image
              width="100%"
              :src="
                require('@/assets/img/member/member-cover2.png')
              "
            ></van-image>
            <div class="member_center_footer">
              <div class="member_center_footer_left">
                <label>龙拎台河鲜四人餐</label>
                <p>价值500元尊享四人餐</p>
              </div>
              <div class="member_center_footer_right">
                <del>￥500</del>
                <b>￥328</b>
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
          style="top: 3px"
          height="25"
          :src="require('@/assets/img/member/member-icon-free.png')"
        />
        <label>惠享免费</label>
      </header>
      <article class="member_isFrr">
        <ul>
          <li v-for="item in 4" :key="item[0]" @click="Url('/')">
            <van-image
              width="100%"
              height="100%"
              :src="
                require('@/assets/img/member/member-cover1.png')
              "
            ></van-image>
            <div class="member_isFrr_footer">
              <div class="member_isFrr_footer_one">
                <label>龙拎台河鲜四人餐</label>
                <del>￥328</del>
              </div>
              <div class="member_isFrr_footer_two">
                <p class="van-ellipsis">
                  价值500元尊享四人餐价值500元尊享四人餐
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
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
        <section
          class="member_mf"
          @click="Url('/')"
          v-for="item in list"
          :key="item[0]"
        >
          <van-image
            width="100%"
            height="100%"
            :src="require('@/assets/img/member/member-cover3.png')"
          ></van-image>
          <p>
            <span>【贤合双人餐】</span
            >到店吃套餐，【素菜】竹荪、小木耳、香菇，【素菜】竹荪、小木耳、香菇【素菜】竹荪、小木耳、香菇。
          </p>
          <div class="member_mf_footer">
            <p class="member_mf_footer_left">
              <b>￥39.3</b>
              <del>门市价：￥198</del>
              <span>返05￥-10￥</span>
            </p>
            <p>销售量：689</p>
          </div>
        </section>
      </van-list>
      <van-divider v-show="finished">我是有底线的</van-divider>
    </van-pull-refresh>

    <v-footer :active="1"></v-footer>
  </div>
</template>

<script>
import banner from "../../components/banner";
import footer from "../../components/footer";
import advertisement from "../../components/advertisement";
export default {
  name: "member",
  data() {
    return {
      bannerList: [
        {
          img: require("@/assets/img/member/member-banner-poster1.png"),
          link: "/",
        },
        {
          img: require("@/assets/img/member/member-banner-poster1.png"),
          link: "/",
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
