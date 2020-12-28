<template>
  <a-button type="primary" @click="initTest">
    成功
  </a-button>
</template>

<script>
  import axios from 'axios'
  import publicJs, {request} from "../../plugins/js/publicJs";

  export default {
    data() {
      return {
      };
    },
    created() {
    },
    methods:{
      initTest(){
        // axios({
        //   headers: {
        //     Origin: "",
        //     Referer: "182.148.89.145:8080"
        //   },
        //   method:'get',
        //   url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential" +
        //     "&appid=wx6afbad17fee1f6ac&secret=7286e0076fc5aeb2414dbf873d70503e",
        // }).then(function(res){
        //   console.log(res);
        // });
        request({
          url:publicJs.urls.shareCreateQR + "?qrcodeUrl=http://huxiang.nat300.top/wxLogin/doLogin?toPage=index",
          method:'get',
        }).then(res => {
          console.log(res);
        })
      }
    }
  };
</script>

<style scoped>

</style>
