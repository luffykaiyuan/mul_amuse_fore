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
              :src="userInfo.headimgurl"
            ></van-image>
          </div>
        </van-col>
        <van-col span="16" offset="4" class="box_body_cols">
          <p
            class="van-ellipsis user_title"
            style="display: flex; justify-content: space-between"
          >
            {{userInfo.nickName}}
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
            v-if="userInfo.userRank === '1'"
          >
            会员有效期:{{superInfo.endTime}} 剩余次数:{{superInfo.haveNumber}}
          </p>
          <p style="color: gray; margin: 5px 0; font-size: 14px" v-if="userInfo.userRank === '0'">
            惠享体验卡助力进程:{{inviteInfo.haveInvite}}/1
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
            v-if="userInfo.userRank === '2'"
          >
            很遗憾，您的会员已过期...
          </p>
          <van-progress
            pivot-text="红色"
            :color="link_color"
            stroke-width="13px"
            :percentage="length"
            :show-pivot="false"
            v-if="userInfo.userRank === '0'"
          />
          <span @click="fxs()" v-if="userInfo.userTitle !== '0'" class="router_link">
            <van-image
              width="20"
              height="20"
              style="position: relative;"
              :src="require('@/assets/img/details/details-icon-share.png')"
            ></van-image>
            <span>邀请</span>
          </span>
          <van-dialog v-model="fx" show-cancel-button confirm-button-text="保存分享图片" @confirm="saveShare">
            <div ref="imageDom">
              <van-image
                width="100%"
                height="100%"
                :src="share"
              ></van-image>
            </div>
          </van-dialog>
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
          @click="Url('/register')"
          v-if="userInfo.userTitle === '0'"
        >
          <van-image
            style="margin-top: 5px; margin-right: 5px"
            round
            width="20"
            height="20"
            :src="require('@/assets/img/person/person-icon-box.png')"
          ></van-image>
          <p>成为达人</p>
        </van-col>
        <van-col
          span="8"
          offset="2"
          class="box_body_cols_button"
          @click="Url('/box')"
          v-else
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
              v-for="item in allOrder"
              :key="item[0]"
              centered
              :desc="item.modelName"
              :thumb="item.productImg"
            >
              <template #title>
                <div class="card_title">
                  <b style="font-size: 17px">{{item.productTitle}}</b>
                  <van-image
                    width="40"
                    height="30"
                    style="margin-right: 20px"
                    :src="
                      require('@/assets/img/person/person-icon-done.png')
                    "
                    v-if="item.status === '4' || item.status === '2'"
                  ></van-image>
                </div>
              </template>
              <template #num>
                <p>
                  订单价:<span style="font-size: 16px; color: black">{{item.orderPrice}}</span
                  >元
                </p>
              </template>
              <template #footer>
                <van-button size="small" @click="openPost(item)" v-if="item.status === '3'" round>查看单号</van-button>
                <van-button size="small" @click="openAppoint(item)" v-if="item.productType === '2' && item.status === '1'" round>查看订单</van-button>
                <van-button size="small" @click="openCode(item)" round v-if="item.productType === '0' && item.status === '1'">核销码</van-button>
                <van-button size="small" @click="finishOrder(item)" v-if="item.status !== '4' && item.status !== '2'" round>订单完成</van-button>
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
              v-for="item in payList"
              :key="item[0]"
              centered
              :desc="item.modelName"
              :thumb="item.productImg"
            >
              <template #title>
                <div class="card_title">
                  <b style="font-size: 17px">{{item.productTitle}}</b>
                </div>
              </template>
              <template #num>
                <p>
                  订单价:<span style="font-size: 16px; color: black">{{item.orderPrice}}</span
                  >元
                </p>
              </template>
              <template #footer>
                <van-button size="small" @click="openCode(item)" round v-if="item.productType === '0'">核销码</van-button>
                <van-button size="small" @click="finishOrder(item)" round>订单完成</van-button>
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
              v-for="item in apponinList"
              :key="item[0]"
              centered
              :desc="item.modelName"
              :thumb="item.productImg"
            >
              <template #title>
                <div class="card_title">
                  <b style="font-size: 17px">{{item.productTitle}}</b>
                </div>
              </template>
              <template #num>
                <p>
                  订单价:<span style="font-size: 16px; color: black">{{item.orderPrice}}</span
                  >元
                </p>
              </template>
              <template #footer>
                <van-button size="small" @click="openPost(item)" round>查看单号</van-button>
                <van-button size="small" @click="finishOrder(item)" round>订单完成</van-button>
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
          <p>已发货</p>
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
              v-for="item in finishList"
              :key="item[0]"
              centered
              :desc="item.modelName"
              :thumb="item.productImg"
            >
              <template #title>
                <div class="card_title">
                  <b style="font-size: 17px">{{item.productTitle}}</b>
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
                  订单价:<span style="font-size: 16px; color: black">{{item.orderPrice}}</span
                  >元
                </p>
              </template>
<!--              <template #footer>-->
<!--                <van-button size="small" @click="Url('/details/' + item.id)" round>再次购买</van-button>-->
<!--              </template>-->
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
    <van-dialog v-model="orderVisible" title="订单" show-cancel-button :lock-scroll="lockscroll">
      <van-cell title="订单号：" :value="orderNumber"/>
      <van-image width="100" height="100" :src="codeImg" />
<!--      <van-image  width="50" height="50" src="https://img.yzcdn.cn/vant/apple-3.jpg" />-->
      <van-cell title="核销码" :value="codeNumber"/>
    </van-dialog>
    <van-dialog v-model="postVisible" title="实物订单" show-cancel-button :lock-scroll="lockscroll">
      <van-cell title="订单号：" :value="orderNumber"/>
      <van-cell title="快递单号" :value="postNumber"/>
    </van-dialog>
    <van-dialog v-model="appointVisible" title="预约订单" show-cancel-button :lock-scroll="lockscroll">
      <van-cell title="订单号：" :value="orderNumber"/>
    </van-dialog>
<!--    <van-dialog v-model="mailVisible" title="成为达人" :before-close="onBeforeClose" show-cancel-button>-->
<!--      <van-field v-model="aliyunMessageVo.phone" type="tel" :rules="[{ pattern, message: '请输入正确的手机号码' }]"-->
<!--        label="手机号码" colon placeholder="请输入手机号码"/>-->
<!--      <van-field v-model="aliyunMessageVo.verifyNumber" center clearable label="短信验证码" placeholder="请输入验证码">-->
<!--        <template #button>-->
<!--          <van-button size="small" @click="sendMessage" :disabled="sendFinish" type="primary">发送验证码</van-button>-->
<!--        </template>-->
<!--      </van-field>-->
<!--    </van-dialog>-->
    <v-footer :active="2" v-if="undestroy"></v-footer>
  </div>
</template>

<script>
import footer from "../../components/footer";
import publicJs, {request} from "../../plugins/js/publicJs";
import axios from "axios";
import { Dialog } from 'vant';

export default {
  name: "user",
  data() {
    return {
      userId: '',
      userInfo: [],
      superInfo: [],
      inviteInfo: [],
      allOrder: [],
      payList: [],
      apponinList: [],
      finishList: [],
      fx: false,
      orderVisible: false,
      postVisible: false,
      mailVisible: false,
      appointVisible:false,
      share: '',
      codeImg: '',
      codeNumber: '',
      postNumber: '',
      orderNumber:'',
      lockscroll:false,

      // aliyunMessageVo:{
      //   phone: '',
      //   nodeNumber: '',
      //   verifyNumber: ''
      // },

      userPhone: '',
      mailNumber: '',

      active: 0,
      userState: true, //会员状态
      length: 0,
      link_color: "#ee0a24", //#cb0e0e 进度条颜色
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
      sendFinish: false,
      undestroy:true,
    };
  },
  components: {
    "v-footer": footer,
  },

  activated() {
    this.undestroy = true
  },
  deactivated() {
    this.undestroy = false;
  },

  created() {
    this.userId = localStorage.getItem("userToken");
    this.initUser();
  },
  methods: {
    initUser(){
      request({
        url:publicJs.urls.selectUserById + "?id=" +this.userId,
        method:'get',
      }).then(res => {
        this.userInfo = res.data;
        if (this.userInfo.userRank === '0'){
          this.initInvite();
        } else if (this.userInfo.userRank === '1'){
          this.initSuper();
        }else {
        }
        this.initOrder();
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
    initOrder(){
      this.payList = [];
      this.apponinList = [];
      this.finishList = [];
      request({
        url:publicJs.urls.selectUserOrder + "?userId=" +this.userId,
        method:'get',
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].productImg = this.getImg(res.data[i].productImg);
          if (res.data[i].status === "1"){
            this.payList.push(res.data[i]);
          }else if(res.data[i].status === "3"){
            this.apponinList.push(res.data[i]);
          }else {
            this.finishList.push(res.data[i]);
          }
        }
        this.allOrder = res.data;
      })
    },
    //初始化邀请
    initInvite(){
      request({
        url:publicJs.urls.selectInvite + "?userId=" +this.userId,
        method:'get',
      }).then(res => {
        this.inviteInfo = res.data;
        this.length = parseInt(res.data.haveInvite / 1 * 100) ;
      })
    },
    //初始化话会员信息
    initSuper(){
      var date = new Date();
      request({
        url:publicJs.urls.selectByUserId + "?userId=" +this.userId,
        method:'get',
      }).then(res => {
        var startTime = new Date(Date.parse(res.data.endTime));
        if (startTime < date){
          this.userInfo.userRank = '2';
          request({
            url:publicJs.urls.updateUser,
            method:'post',
            data: this.userInfo
          }).then(res => {
            this.overVip();
          }).catch(err => {
            this.$message.error(res.data)
          })
        }else {
          this.superInfo = res.data;
        }
      })
    },
    //购买会员卡
    initSuperSet(){
      request({
        url:publicJs.urls.selectAllSet,
        method:'get',
      }).then(res => {
        this.supersetInfo = res.data;
      })
    },
    //加量包购买
    initSuperMore(){
      request({
        url:publicJs.urls.selectAllMore,
        method:'get',
      }).then(res => {
        this.moreInfo = res.data;
      })
    },

    //核销码
    openCode(item){
      this.codeImg = this.getImg(item.qrcodeImg);
      this.codeNumber = item.qrcodeNumber;
      this.orderVisible = true;
      this.orderNumber = item.orderNumber;
    },
    //快递单号
    openPost(item){
      this.postNumber = item.postNumber;
      this.postVisible = true;
      this.orderNumber = item.orderNumber;
    },
    openAppoint(item){
      this.appointVisible = true;
      this.orderNumber = item.orderNumber;
    },
    //完成订单
    finishOrder(item){
      Dialog.confirm({
        title: '订单确认',
        message: '是否确认订单已经完成？',
      })
        .then(() => {
          request({
            url:publicJs.urls.getProduct,
            method:'post',
            data: item
          }).then(res => {
            this.$message.success("确认成功！！");
            this.initOrder();
          }).catch(err => {
            this.$message.error(res.data)
          })
        })
        .catch(() => {
          // on cancel
        });
    },
    //保存分享截图
    saveShare(){
      var alink = document.createElement("a");
      alink.href = this.share;
      alink.download = "picture"; //图片名
      alink.click();
    },

    // //成为达人
    // openTalent(){
    //   this.aliyunMessageVo.phone = '';
    //   this.aliyunMessageVo.verifyNumber = '';
    //   this.mailVisible = true;
    //   this.sendFinish = false;
    // },
    // sendMessage(){
    //   this.sendFinish = true;
    //   if (!this.aliyunMessageVo.phone){
    //     this.$message.error("请输入手机号！！");
    //     this.sendFinish = false;
    //     return;
    //   }
    //   if (!this.aliyunMessageVo.nodeNumber){
    //     request({
    //       url:publicJs.urls.sendMessage,
    //       method:'post',
    //       data: this.aliyunMessageVo
    //     }).then(res => {
    //       this.aliyunMessageVo.nodeNumber = res.data;
    //     }).catch(err => {
    //       this.$message.error(res.data)
    //     })
    //   }
    // },
    // onBeforeClose(action, done){
    //   if (action === 'confirm') {
    //     if (this.aliyunMessageVo.nodeNumber.toString() === this.aliyunMessageVo.verifyNumber){
    //       request({
    //         url:publicJs.urls.blindPhone + "?verifyNumber=" + this.aliyunMessageVo.verifyNumber,
    //         method:'get',
    //       }).then(res => {
    //         if (res.data){
    //           this.userInfo.userPhone = this.aliyunMessageVo.phone;
    //           this.userInfo.userTitle = "1";
    //           request({
    //             url:publicJs.urls.updateUser,
    //             method:'post',
    //             data: this.userInfo
    //           }).then(res => {
    //             this.$message.success("绑定成功！！");
    //             this.initUser();
    //             done();
    //           }).catch(err => {
    //             this.$message.error("验证码错误！！");
    //           })
    //         }else {
    //           this.$message.error("验证码错误！！");
    //           done(false);
    //         }
    //       }).catch(err => {
    //         this.$message.error(res.data)
    //       })
    //     }else {
    //       this.$message.error("验证码错误！！");
    //       done(false);
    //     }
    //   } else {
    //     done();
    //   }
    // },

    fxs() {
      if (this.share){
        this.fx = true;
      }else {
        request({
          url:publicJs.urls.shareCreateQR + "?qrcodeUrl=" + axios.defaults.baseURL + "/wxLogin/doShareLogin?fatherId=" + this.userId + "%26toPage=register",
          method:'get',
        }).then(res => {
          this.share = this.getImg(res.data);
          this.fx = true;
        })
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

