<template>
  <div class="address">
    <v-addressList></v-addressList>
    <div class="bottom">
      <span style="cursor: pointer;user-select: none;" @click="linkNewAddress">⊕新增地址...</span>
    </div>
  </div>
</template>

<script>
  import publicJs, {request} from "../../plugins/js/publicJs";

  import addressList from "../../components/addressList";
  export default {
    data() {
      return {
        userId: '',
        receiveList: [],

      };
    },
    created() {
      this.userId = localStorage.getItem("userToken");
    },
    methods: {

      linkNewAddress() {
        this.$router.push({ path: "/newAddress" });
      },
      Message() {
        this.$dialog
          .confirm({
            message: "是否删除地址",
          })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      },
    },
    components: {
      "v-addressList": addressList,
    },
  };
</script>

<style lang="scss">
.address {
    padding:5px;
  .bottom {
    height: 100px;
    line-height: 100px;
    width: 100%;
    margin: auto;
    font-size: 20px;
    background: #fff;
  }
}
</style>
