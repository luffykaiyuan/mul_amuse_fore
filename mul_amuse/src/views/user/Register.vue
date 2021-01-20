<template>
  <div class="Bgpic">
    <van-form @submit="onSubmit">

      <div style="margin-top: 50px">
          <van-field
            v-model="tel"
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
            name="tel"
            :rules="[{  pattern , message: '请输入正确的手机号码' }]"
            :required="requiredTel"
            @blur="Changebutton"
          />

          <van-field
            v-model="smscode"
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
              <van-button v-if="!showCutDownTime" size="small" type="primary" @click="sendSMSCode" native-type="button">发送验证码</van-button>
              <van-button v-if="showCutDownTime" size="small" type="primary" native-type="button">{{cutDownTime}}s后再试</van-button>
            </template>
          </van-field>
      </div>

      <div style="margin-top: 50px">
        <span>注册即同意</span>
        <span class="user_agr" @click="Message">《成都惠享生活平台用户服务协议》</span>
      </div>

      <div style="margin-top: 50px">
        <van-button round block type="info" native-type="submit" :disabled="confirmDisable">确认并绑定</van-button>
      </div>

    </van-form>

  </div>

</template>

<script>
export default {
  name: "Register",
  data() {
    return{
      tel: '',
      smscode:'',
      requiredTel:true,
      requiredSmscode:true,
      showCutDownTime:false,
      cutDownTime:'',
      pattern:/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
      smspattern:/\d{6}/,
      confirmDisable:true,
    }
  },

  methods:{
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
    },

    Message() {
      this.$dialog.alert({
        title: "平台用户协议",
        message: "...",
      });
    },
    Changebutton(){
      if (this.tel && this.smscode) {
        this.confirmDisable = false;
      } else {
        this.confirmDisable = true;
      }
    },
    onSubmit(values) {
      console.log('submit', values);
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
