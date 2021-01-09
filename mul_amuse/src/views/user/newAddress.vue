
<template>
  <div class="newAddress">
    <v-addressForm v-on:childByValue="childByValue"></v-addressForm>
    <van-button type="primary" @click="Sumbit">保存</van-button>
  </div>
</template>

<script>
import addressForm from "../../components/addressForm";
import publicJs, {request} from "../../plugins/js/publicJs";
export default {
  data() {
    return {
      // addOrUpdate: 'add',
      // id: '',
      receiveForm: {
        userId: '',
        receiveName: '',
        receivePhone: '',
        receiveArea: '',
        receiveAddress: '',
      }
    };
  },
  created() {
    // var id = this.$route.params.id;
    // if (id){
    //   this.id = id;
    //   this.receiveForm = 'update';
    //   this.initForm(id);
    // }
  },
  methods: {
    // initForm(id){
    //   request({
    //     url:publicJs.urls.selectById + "?id=" +this.id,
    //     method:'get',
    //   }).then(res => {
    //     this.receiveForm = res.data[0];
    //   })
    // },
    childByValue(data) {
      this.requiredTel = data[0];
      this.requiredAddress = data[1];
      this.requiredName = data[2];
      this.requiredArea = data[3];

      this.receiveForm.userId = localStorage.getItem("userToken");
      this.receiveForm.receiveName = data[4];
      this.receiveForm.receivePhone = data[5];
      this.receiveForm.receiveArea = data[6];
      this.receiveForm.receiveAddress = data[7];
    },

    Sumbit() {
      console.log(this.receiveForm);
      if (
        this.requiredAddress == false &&
        this.requiredName == false &&
        this.requiredArea == false &&
        this.requiredTel == false
      ) {
        request({
          url:publicJs.urls.insertReceive,
          method:'post',
          data: this.receiveForm,
        }).then(res => {
          this.$router.push({ path: "/Address" });
        })
      }else{
        this.$message.warning("请确保信息完整！");
      }
    },
  },
  components: {
    "v-addressForm": addressForm,
  },
};
</script>

<style lang='scss'>
body {
  background-color: #f5f5f5;
  height: 100%;
}
.newAddress {
  .van-button {
    margin-top: 20px;
    background-color: #932023;
    width: 100px;
    border-radius: 5px;
    border: none;
    height: 40px;
  }
  .van-button span {
    color: #ffffff;
  }
}
</style>
