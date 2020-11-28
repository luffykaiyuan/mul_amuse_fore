<template>
  <v-card class="mx-auto" max-width="320" max-height="1000" elevation="24" outlined shaped
          style="margin: auto;">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field label="账号" :rules="rules" hide-details="auto" v-model="loginInfo.username"></v-text-field>
      <v-text-field type="password" label="密码" :rules="rules" hide-details="auto" v-model="loginInfo.password"></v-text-field>
      <v-btn @click="login" style="float: right; margin-right: 20px;margin-top: 20px;">
        登录
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    rules: [
      value => !!value || 'Required.',
      value => (value && value.length < 16) || 'Max 16 characters',
    ],
    valid: true,
    loginInfo: {
      username: 'admin',
      password: '',
    },
  }),
  methods: {
    login(){
      if (this.loginInfo.username === 'admin' && this.loginInfo.password === '123'){
        this.$message.success("登录成功！！", 1, ()=>{
          this.$router.push("/");
        })
      }else {
        this.$message.warning("登录失败！！")
      }
    },
  },
}
</script>
