<template>
  <div class="banner-page" @touchstart="touchStart" @touchmove="touchMove">
    <div class="banner-box">
      <div
        :class="move ? 'banner1 banner move' : 'banner1 banner'"
        @click="Url(productList[0].link)"
        :style="{
          background: `url(${data_list[0].bg})`,
        }"
      >
        <div class="banner-header">
          <div class="left">
            <img :src="data_list[0].logo" alt="" />
          </div>
          <div class="middle">
            <div class="name">{{ productList[0].storeName }}</div>
            <div class="text">{{ productList[0].productTitle }}</div>
          </div>
          <div class="right">
            <div class="btn" style="color: #b11123">立即购买</div>
          </div>
        </div>
        <div class="banner-main">
          <div class="card">
            <van-image width="100%" height="80px" :src="productList[0].productSpecialImg"></van-image>
          </div>
          <div class="card">
            <van-image width="100%" height="80px" :src="productList[0].productSpecialImg2"></van-image>
          </div>
        </div>
      </div>
      <div
        :class="move ? 'banner2 banner hide' : 'banner2 banner'"
        @click="Url(productList[1].link)"
        :style="{ background: `url(${data_list[1].bg})` }"
      >
        <div class="banner-header">
          <div class="left">
            <img :src="data_list[1].logo" alt="" />
          </div>
          <div class="middle">
            <div class="name">{{ productList[1].storeName }}</div>
            <div class="text">{{ productList[1].productTitle }}</div>
          </div>
          <div class="right">
            <div class="btn" style="color: #b11123">立即购买</div>
          </div>
        </div>
        <div class="banner-main">
          <div class="card">
            <van-image width="100%" height="80px" :src="productList[1].productSpecialImg"></van-image>
          </div>
          <div class="card">
            <van-image width="100%" height="80px" :src="productList[1].productSpecialImg2"></van-image>
          </div>
        </div>
      </div>
      <div
        :class="move ? 'banner3 banner hide' : 'banner3 banner'"
        @click="Url(productList[2].link)"
        :style="{ background: `url(${data_list[2].bg})` }"
      >
        <div class="banner-header">
          <div class="left">
            <img :src="data_list[2].logo" alt="" />
          </div>
          <div class="middle">
            <div class="name">{{ productList[2].storeName }}</div>
            <div class="text">{{ productList[2].productTitle }}</div>
          </div>
          <div class="right">
            <div class="btn" style="color: #b11123">立即购买</div>
          </div>
        </div>
        <div class="banner-main">
          <div class="card">
            <van-image width="100%" height="80px" :src="productList[2].productSpecialImg"></van-image>
          </div>
          <div class="card">
            <van-image width="100%" height="80px" :src="productList[2].productSpecialImg2"></van-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import publicJs, {request} from "../plugins/js/publicJs";
import axios from "axios";

export default {
  data() {
    return {
      productList: [],
      data_list: [
        {
          bg: require("@/assets/img/home/home-bg-recom.png"),
          logo:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3851876075,4035368835&fm=26&gp=0.jpg",
        },
        {
          bg:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1234817799,3490569220&fm=26&gp=0.jpg",
          logo:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1051452078,2851059078&fm=26&gp=0.jpg",
        },
        {
          bg:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2077625409,245021064&fm=26&gp=0.jpg",
          logo:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg",
        },
      ],
      move: false,
      touch_x: "",
    };
  },
  created() {
    this.initProduct();
  },
  methods: {
    initProduct(){
      request({
        url:publicJs.urls.selectIndexTwoShow,
        method:'get',
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].link = "/details/" + res.data[i].id;
          res.data[i].productSpecialImg = this.getImg(res.data[i].productSpecialImg);
          res.data[i].productSpecialImg2 = this.getImg(res.data[i].productSpecialImg2);
        }
        res.data[0].classInfo = "move ? 'banner1 banner move' : 'banner1 banner'";
        res.data[1].classInfo = "move ? 'banner2 banner hide' : 'banner2 banner'";
        res.data[2].classInfo = "move ? 'banner3 banner hide' : 'banner3 banner'";
        this.productList = res.data;
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

    changeBannerRight() {
      let banner_data = this.productList.shift(0);
      let banner_data_ori = this.data_list.shift(0);
      this.productList.push(banner_data);
      this.data_list.push(banner_data_ori);
      this.move = true;
      setTimeout(() => {
        this.move = false;
      }, 500);
    },
    changeBannerLeft() {
      let banner_data = this.productList.pop(this.productList.length - 1);
      let banner_data_ori = this.data_list.pop(this.data_list.length - 1);
      this.productList.unshift(banner_data);
      this.data_list.unshift(banner_data_ori);
      this.move = true;
      setTimeout(() => {
        this.move = false;
      }, 500);
    },
    touchStart(e) {
      this.touch_x = e.changedTouches[0].clientX;
    },
    touchMove(e) {
      let movex = e.changedTouches[0].clientX;
      if (this.touch_x) {
        if (movex > this.touch_x) {
          this.changeBannerLeft();
        } else {
          this.changeBannerRight();
        }
      }
      this.touch_x = "";
    },
  },
};
</script>
<style lang="scss">
@keyframes hide {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes move {
  from {
    opacity: 0.5;
    left: -10px;
  }
  to {
    opacity: 1;
    left: 0px;
  }
}
.move {
  animation: 300ms move linear;
}
.hide {
  animation: 500ms hide linear;
}
.banner-page {
  width: 100%;
  height: 200px;
  margin: 0 auto;
  padding-left: 20px;
  box-sizing: border-box;
  .banner-box {
    width: 100%;
    height: 100%;
    position: relative;
    .banner {
      width: 95%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 3;
      overflow: hidden;
      border-radius: 20px;
      .banner-header {
        width: 100%;
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        margin: 10px 0;
        box-sizing: border-box;
        .left {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .middle {
          width: 60%;
          padding-left: 10px;
          box-sizing: border-box;
          text-align: left;
          color: #fff;
          .name {
            font-size: 14px;
          }
          .text {
            font-size: 12px;
          }
        }
        .right {
          width: 60px;
          height: 20px;
          border-radius: 10px;
          font-size: 12px;
          background-color: #fff;
          text-align: center;
          line-height: 20px;
        }
      }
      .banner-main {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 5px;
        box-sizing: border-box;
        .card {
          width: 50%;
          height: 100%;
          margin-right: 5px;
        }
      }
    }
    .banner2 {
      left: 10px;
      z-index: 2;
    }
    .banner3 {
      left: 20px;
      z-index: 1;
    }
  }
}
</style>
