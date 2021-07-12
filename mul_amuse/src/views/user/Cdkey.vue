<template>
  <div
    class="Cdk"
    :style="{
      background: `url(${require('@/assets/img/cdkey/cdkey-bg.jpg')})`,
    }"
  >

    <div class="cdk_input">
      <van-form @submit="onSubmit">
        <van-field
          v-model="cdkey"
          input-align="center"
          clearable
          placeholder="请输入9位兑换码"
          :rules="[{ pattern:/^[A-Za-z0-9]{9}$/ , required: true, message: '请填写正确的兑换码' }]"
          maxlength="9"
          style="border-radius: 5px;"/>
        <div style="width: 40% ;height: 40% ;  margin: 0 auto;">
          <van-button
            class="button"
            size="large"
            color="#FAD1AD">
            <font>立即兑换</font>
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import publicJs, {request} from "../../plugins/js/publicJs";

export default {
  name: "Cdkey",

  data() {
    return {
      userInfo: [],
      userId:'',
      cdkey :'',
      vipForm :{},
      sdkInfo: {}
    }
  },
  created() {

  },
  mounted() {
    this.userId = localStorage.getItem("userToken");
    this.initUser();
  },

  methods:{
    initUser(){
      request({
        url:publicJs.urls.selectUserById + "?id=" +this.userId,
        method:'get',
      }).then(res => {
        this.userInfo = res.data;
        this.VerifyUserStatus();
        if (this.userInfo.userRank !== '0'){
          this.initSuper();
        }
      })
    },
    initSuper(){
      request({
        url:publicJs.urls.selectByUserId + "?userId=" +this.userId,
        method:'get',
      }).then(res => {
        this.vipForm = res.data;
      })
    },
    VerifyUserStatus(){
      if(this.userInfo.userRank == 1){
        this.$toast({
          type:"fail",
          message:'你当前已是会员，无法完成兑换',
          duration:2586,
          onClose:()=>{
            this.$router.push('/')
          }
        })
      }
      if(this.userInfo.userTitle == 0){
        this.$toast({
          type:"fail",
          message:'请先进行手机号绑定成为达人后再兑换',
          duration:2586,
          onClose:()=>{
            this.$router.push('/')
          }
        })
      }
    },
    onSubmit(){
      if(this.cdkey){
        this.cdkey = this.cdkey.toLowerCase()
        request({
          url:publicJs.urls.selectBySdk + "?sdkNumber=" +this.cdkey,
          method:'get',
        }).then(res => {
          //校验sdk是否正确和是否被使用
          if (res.data && res.data.status === '1'){
            this.sdkInfo = res.data;
            //计算时间
            let startDate = new Date();
            let endDate = new Date();
            endDate.setDate(startDate.getDate() + 7);
            var y = endDate.getFullYear();
            var m = (endDate.getMonth() < 10 ? "0" + (endDate.getMonth() + 1).toString() : endDate.getMonth() + 1);
            var d = (endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate());
            //设置对象
            this.vipForm.userId = this.userId;
            this.vipForm.haveNumber = 1;
            this.vipForm.endTime = y + "-" + m + "-" + d;
            //不是会员的话插入1次会员
            if (this.userInfo.userRank === '0'){
              request({
                url: publicJs.urls.insertSuperVIP,
                method: 'post',
                data: this.vipForm
              }).then(res => {
                this.$toast({
                  type:"success",
                  message:'谢谢你泰罗',
                  onClose:()=>{
                    this.$router.push('/member')
                  }
                })
                //this.$message.success("恭喜您成为超级会员！！");
              }).catch(err => {
                this.$message.error(res.data)
              })
              //消除Sdk
              this.sdkInfo.userId = this.userInfo.id;
              this.sdkInfo.status = '0';
              request({
                url: publicJs.urls.updateSdk,
                method: 'post',
                data: this.sdkInfo
              }).then(res => {
              }).catch(err => {
                this.$message.error(res.data)
              })

              //更新用户rank
              this.userInfo.userRank = '1';
              this.updateUser(this.userInfo)
            } else if (this.userInfo.userRank === '2'){
              //会员过期状态的用户 更新会员数据
              request({
                url: publicJs.urls.updateSuperVIP,
                method: 'post',
                data: this.vipForm
              }).then(res => {
                this.$toast({
                  type:"success",
                  message:'兑换成功！\n 快去使用吧！',
                  onClose:()=>{
                    this.$router.push('/member')
                  }
                })
              }).catch(err => {
                this.$message.error(res.data)
              })
              //消除Sdk
              this.sdkInfo.userId = this.userInfo.id;
              this.sdkInfo.status = '0';
              request({
                url: publicJs.urls.updateSdk,
                method: 'post',
                data: this.sdkInfo
              }).then(res => {
              }).catch(err => {
                this.$message.error(res.data)
              })

              //更新用户rank
              this.userInfo.userRank = '1';
              this.updateUser(this.userInfo)
            }
          }else {
            return;
          }
        })
      }
    },
    updateUser(userInfo){
      request({
        url: publicJs.urls.updateUser,
        method: 'post',
        data: userInfo
      }).then(res => {
        //this.initUser();
      }).catch(err => {
        this.$message.error(res.data)
      })
    }
  },
}
</script>

<style lang='scss'>
.Cdk {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: 100% 100% !important;
}
.cdk_input {
  background: transparent;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  position: relative;
  top: 43%;
}
.button{
  margin-top: 20%;
  border-radius: 5px;
}
font{
  font-size: 19px;
  color: #671015;
  font-weight: bold;
}
</style>
