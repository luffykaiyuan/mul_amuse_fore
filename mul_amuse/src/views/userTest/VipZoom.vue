<template>
  <div style="background:#ECECEC; padding:30px; height: 100%;" >
    <a-row :gutter="16">
      <a-col :offset="2">
        <a-card title="会员专区" :bordered="false" style="width: 1200px">
          <div style="background: #ECECEC; padding: 30px" v-if="userInfo.userRank === '0'">
            <a-row :gutter="16">
              <a-col :span="24">
                <a-card>
                  <a-statistic title="邀请人数" :value="inviteInfo.haveInvite" class="demo-class">
                    <template #suffix>
                      <span> / 5</span>
                    </template>
                  </a-statistic>
                </a-card>
              </a-col>
            </a-row>
          </div>
          <div style="background: #ECECEC; padding: 30px" v-if="userInfo.userRank === '1'">
            <a-row :gutter="16">
              <a-col :span="12">
                <a-card>
                  <a-statistic title="剩余次数：" :value="superInfo.haveNumber" :precision="2" suffix="次" :value-style="{ color: '#3f8600' }" style="margin-right: 50px"></a-statistic>
                </a-card>
              </a-col>
              <a-col :span="12">
                <a-card>
                  <a-statistic title="到期时间" :value="superInfo.endTime" :precision="2"class="demo-class" :value-style="{ color: '#cf1322' }"></a-statistic>
                </a-card>
              </a-col>
            </a-row>
          </div>
          <div style="background: #ECECEC; padding: 30px" v-if="userInfo.userRank === '2'">
            <a-row :gutter="16">
              <a-col :span="24">
                <a-card title="您的会员已经过期，请重新购买">
                </a-card>
              </a-col>
            </a-row>
          </div>
          <a-card title="购买会员" :style="{ marginTop: '16px' }" v-if="userInfo.userRank !== '1'">
            <a-row :gutter="16">
              <a-col :span="8" v-for="item in supersetInfo" :key="item.id">
                <a-card hoverable>
                  <template slot="actions" class="ant-card-actions">
                    <a-button @click="setOpen(item)">
                      ￥{{item.supervipPrice}}立即购买
                    </a-button>
                  </template>
                  <a-card-meta :title="item.supervipName" description="This is the description"></a-card-meta>
                </a-card>
              </a-col>
            </a-row>
          </a-card>
          <a-card title="加量包" :style="{ marginTop: '16px' }" v-if="userInfo.userRank === '1'">
            <a-row :gutter="16">
              <a-col :span="8" v-for="item in moreInfo" :key="item.id">
                <a-card hoverable>
                  <template slot="actions" class="ant-card-actions">
                    <a-button @click="moreOpen(item)">
                      ￥{{item.morePrice}}立即购买
                    </a-button>
                  </template>
                  <a-card-meta :title="item.moreName"  description="This is the description"></a-card-meta>
                </a-card>
              </a-col>
            </a-row>
          </a-card>
          <a-card title="会员商品" :style="{ marginTop: '16px' }">
            <a-row :gutter="16">
              <a-col :span="8" v-for="item in productList" :key="item.id" style="margin-top: 15px;">
                <a-card hoverable>
                  <img slot="cover" alt="example" :src="item.productCoverImg" style="height: 180px; width: 300px;" v-if="item.productCoverImg"/>
                  <img slot="cover" alt="example" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607427243890&di=a681ceadb3ccf5bcede860a78a35b5c1&imgtype=0&src=http%3A%2F%2Fsecretkeycrm.digifilm.com.cn%2Fupload%2F20180530%2Fe676f667c4cdfc7e074898adab2622f2.jpg" style="height: 180px; width: 300px;" v-else/>
                  <template slot="actions" class="ant-card-actions">
                    <a-row v-if="item.saleOut === '0'">
                      <a-col :span="12" :offset="12">
                        <a-button type="primary" html-type="submit" style="color: white" @click="toShop(item)">
                          <a-icon type="shopping" />查看详情
                        </a-button>
                      </a-col>
                    </a-row>
                    <a-button type="danger"  html-type="submit" v-if="item.saleOut === '1'" @click="noStock" style="color: white">
                      <a-icon type="redo" />暂无库存
                    </a-button>
                  </template>
                  <a-card-meta :title="item.productTitle" :description="item.storeName"></a-card-meta>
                </a-card>
              </a-col>
            </a-row>
          </a-card>
        </a-card>
      </a-col>
    </a-row>

    <a-modal v-model="superSet" title="购买会员" @ok="becomeVip">
      <p>您是否要购买{{vipInfo.supervipName}}，价格为￥{{vipInfo.supervipPrice}}?</p>
    </a-modal>

    <a-modal v-model="moreSet" title="加量包" @ok="buyMore">
      <p>您是否要购买{{moreItemInfo.moreName}}，价格为￥{{moreItemInfo.morePrice}}，添加{{moreItemInfo.moreNumber}}?</p>
    </a-modal>
  </div>
</template>

<script>
  import publicJs, {request} from "../../plugins/js/publicJs";
  import axios from "axios";

  export default {
    data: () => ({
      userId: '',
      userInfo: {},
      inviteInfo: {},
      superInfo: {},
      supersetInfo: [{}],
      moreInfo: [{}],
      productList: [{}],

      superSet: false,
      vipInfo: {},
      vipForm: {},

      moreSet: false,
      moreItemInfo: {}
    }),
    created() {
      this.userId = localStorage.getItem("userToken");
      this.initUser();
      this.initProduct();
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
            this.initSuperSet();
          } else if (this.userInfo.userRank === '1'){
            this.initSuper();
            this.initSuperMore();
          }else {
            this.initSuperSet();
          }
        })
      },
      initInvite(){
        request({
          url:publicJs.urls.selectInvite + "?userId=" +this.userId,
          method:'get',
        }).then(res => {
          this.inviteInfo = res.data;
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
      initSuperSet(){
        request({
          url:publicJs.urls.selectAllSet,
          method:'get',
        }).then(res => {
          this.supersetInfo = res.data;
        })
      },
      initSuperMore(){
        request({
          url:publicJs.urls.selectAllMore,
          method:'get',
        }).then(res => {
          this.moreInfo = res.data;
        })
      },
      initProduct(){
        request({
          url:publicJs.urls.selectSuperProduct,
          method:'get',
        }).then(res => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].productCoverImg = this.getImg(res.data[i].productCoverImg);
          }
          this.productList = res.data;
        })
      },
      getImg(id){
        if (id){
          return axios.defaults.baseURL + publicJs.urls.selectFile + "?id=" + id;
        } else {
          return "";
        }
      },
      //购物跳转
      toShop(item){
        this.$router.push("/productDetail/" + item.id + "/");
      },
      //没库存提示
      noStock(){
        this.$message.warning("暂无库存，联系商家添加库存！！")
      },
      setOpen(item) {
        this.vipInfo = item;
        this.superSet = true;
      },
      becomeVip(e) {
        let startDate = new Date();
        let endDate = new Date();
        endDate.setDate(startDate.getDate() + this.vipInfo.haveDay);
        var y = endDate.getFullYear();
        var m = (endDate.getMonth() < 10 ? "0" + (endDate.getMonth() + 1).toString() : endDate.getMonth() + 1);
        var d = (endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate());
        this.vipForm.userId = this.userId;
        this.vipForm.haveNumber = this.vipInfo.haveNumber;
        this.vipForm.endTime = y + "-" + m + "-" + d;

        if (this.userInfo.userRank === '0'){
          request({
            url: publicJs.urls.insertSuperVIP,
            method: 'post',
            data: this.vipForm
          }).then(res => {
            this.$message.success("恭喜您成为超级会员！！");
          }).catch(err => {
            this.$message.error(res.data)
          })
        }else {
          request({
            url: publicJs.urls.updateSuperVIP,
            method: 'post',
            data: this.vipForm
          }).then(res => {
            this.$message.success("恭喜您成为超级会员！！");
          }).catch(err => {
            this.$message.error(res.data)
          })
        }
        this.superSet = false;
        this.userInfo.userRank = "1";
        this.updateUser(this.userInfo);
      },

      moreOpen(item){
        this.moreItemInfo = item;
        this.moreSet = true;
      },
      buyMore(){
        this.superInfo.haveNumber = this.superInfo.haveNumber + this.moreItemInfo.moreNumber;
        request({
          url: publicJs.urls.updateSuperVIP,
          method: 'post',
          data: this.superInfo
        }).then(res => {
          this.$message.success("加量成功！！");
          this.initUser();
          this.moreSet = false;
        }).catch(err => {
          this.$message.error(res.data)
        })
      },

      updateUser(userInfo){
        request({
          url: publicJs.urls.updateUser,
          method: 'post',
          data: userInfo
        }).then(res => {
          this.initUser();
        }).catch(err => {
          this.$message.error(res.data)
        })
      }
    },
  }
</script>
