<template>
  <div class="Bgpic">
    <van-form @submit="onSubmit">

      <div style="margin-top: 50px">
          <van-field
            v-model="aliyunMessageVo.phone"
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
            name="tel"
            :rules="[{  pattern , message: '请输入正确的手机号码' }]"
            :required="requiredTel"
            @blur="Changebutton"
          />

          <van-field
            v-model="aliyunMessageVo.verifyNumber"
            type="number"
            center
            clearable
            label="验证码"
            name="smscode"
            placeholder="请输入短信验证码"
            :rules="[{ smspattern , required: true, message: '请填写正确的短信验证码' }]"
            :required="requiredSmscode"
            @blur="Changebutton">
            <template #button>
              <van-button v-if="!showCutDownTime" size="small" type="info" style="color: white;" @click="sendSMSCode" native-type="button">发送验证码</van-button>
              <van-button v-if="showCutDownTime" size="small" type="primary" native-type="button">{{cutDownTime}}s后再试</van-button>
            </template>
          </van-field>
      </div>

      <div style="margin-top: 50px">
        <span>注册即同意</span>
        <span class="user_agr" @click="Message">《成都惠享生活平台用户服务协议》</span>
      </div>

      <div style="margin-top: 50px">
        <van-button round block type="info" native-type="submit" style="color: white;" :disabled="confirmDisable">确认并绑定</van-button>
      </div>

    </van-form>

  </div>

</template>

<script>
import publicJs, {request} from "../../plugins/js/publicJs";

export default {
  name: "Register",
  data() {
    return{
      userInfo: [],
      userId:'',
      smscode:'',
      requiredTel:true,
      requiredSmscode:true,
      showCutDownTime:false,
      cutDownTime:'',
      pattern:/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
      smspattern:/\d{6}/,
      confirmDisable:true,

      aliyunMessageVo:{
        phone: '',
        nodeNumber: '',
        verifyNumber: ''
      },
    }
  },
  created() {
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
      })
    },
    sendSMSCode(){
      this.showCutDownTime = true;
      this.cutDownTime = 6;
      var cutDownTime_timetimer =  setInterval(()=>{
        this.cutDownTime--;
        if(this.cutDownTime<=0){
          this.showCutDownTime = false;
          clearInterval(cutDownTime_timetimer);
        }
      }, 1000);

      if (!this.aliyunMessageVo.phone){
        this.$message.error("请输入手机号！！");
        return;
      }else {
        request({
          url:publicJs.urls.sendMessage,
          method:'post',
          data: this.aliyunMessageVo
        }).then(res => {
          this.aliyunMessageVo.nodeNumber = res.data;
        }).catch(err => {
          this.$message.error(res.data)
        })
      }
    },

    Message() {
      this.$dialog.alert({
        title: "平台用户协议",
        message: "...",
      });
    },
    Changebutton(){
      if (this.aliyunMessageVo.phone && this.aliyunMessageVo.verifyNumber) {
        this.confirmDisable = false;
      } else {
        this.confirmDisable = true;
      }
    },
    onSubmit() {
      if (this.aliyunMessageVo.nodeNumber.toString() === this.aliyunMessageVo.verifyNumber){
        request({
          url:publicJs.urls.blindPhone + "?verifyNumber=" + this.aliyunMessageVo.verifyNumber,
          method:'get',
        }).then(res => {
          console.log(res);
          if (res.data){
            this.userInfo.userPhone = this.aliyunMessageVo.phone;
            this.userInfo.userTitle = "1";
            request({
              url:publicJs.urls.updateUser,
              method:'post',
              data: this.userInfo
            }).then(res => {
              this.$message.success("绑定成功！！");
              this.$router.push("/my");
            }).catch(err => {
              this.$message.error("验证码错误！！");
            })
          }else {
            this.$message.error("验证码错误！！");
          }
        }).catch(err => {
          this.$message.error(res.data)
        })
      }else {
        this.$message.error("验证码错误！！");
      }
    },
  },



}
</script>

<style>
.Bgpic {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100% 100% !important;
}
.user_agr {
  color: #971818;
  cursor: pointer;
  user-select: none;
}

</style>
