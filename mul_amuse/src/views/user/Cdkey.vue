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
        console.log('cdkey:' + this.cdkey)
        console.log('userId:' + this.userId)
        this.$toast({
          type:"success",
          message:'谢谢你泰罗',
          onClose:()=>{
            this.$router.push('/member')
          }
        })
      }
    },
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
