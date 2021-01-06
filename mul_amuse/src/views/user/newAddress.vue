
<template>
  <div class="newAddress">
    <v-addressForm v-on:childByValue="childByValue"></v-addressForm>
    <van-button type="primary" @click="Sumbit">保存</van-button>
  </div>
</template>

<script>
import addressForm from "../../components/addressForm";
export default {
  data() {
    return {};
  },
  methods: {
    childByValue(data) {
      this.requiredTel = data[0];
      this.requiredAddress = data[1];
      this.requiredName = data[2];
      this.requiredArea = data[3];
      this.tel = data[4];
    },

    Sumbit() {
      var result = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(
        this.tel
      );
      if (
        this.requiredAddress == false &&
        this.requiredName == false &&
        this.requiredArea == false &&
        this.requiredTel == false &&
        result
      ) {
        this.$router.push({ path: "/Address" });
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
