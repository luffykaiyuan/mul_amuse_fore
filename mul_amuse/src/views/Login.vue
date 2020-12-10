<template>
  <v-card class="mx-auto" max-width="320" max-height="1000" elevation="24" outlined shaped
          style="margin: auto;">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field label="账号" :rules="rules" hide-details="auto" v-model="loginInfo.userName"></v-text-field>
      <v-text-field type="password" label="密码" :rules="rules" hide-details="auto" v-model="loginInfo.password"></v-text-field>
      <v-btn @click="login" style="float: right; margin-right: 20px;margin-top: 20px;">
        登录
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import publicJs, {request} from "../plugins/js/publicJs";

export default {
  data: () => ({
    rules: [
      value => !!value || 'Required.',
      value => (value && value.length < 16) || 'Max 16 characters',
    ],
    valid: true,
    loginInfo: {
      userName: '',
      password: '',
    },
  }),
  methods: {
    login(){
      request({
        url:publicJs.urls.loginUser,
        method:'post',
        data: this.loginInfo
      }).then(res => {
        if ("user" === res.data){
          request({
            url:publicJs.urls.selectUerByUsername + "?userName=" + this.loginInfo.userName,
            method:'get',
          }).then(res => {
            localStorage.setItem("userToken", res.data[0].id);
            localStorage.setItem("roles", "user");
            this.$message.success("登录成功！！");
            this.$router.push("/index");
          })
        }else {
          this.$message.warning(res.data)
        }
      }).catch(err => {
        this.$message.error("连接错误!!")
      })
    },
  },
}
</script>
