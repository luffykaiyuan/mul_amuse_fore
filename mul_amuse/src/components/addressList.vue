<template>
  <div class="addressList">
    <div class="body">
      <div class="address_top">
        <van-icon
          name="cross"
          style="float:left;"
          class="top_img"
          @click="Message"
        />
        <van-icon
          @click="linkNewAddress"
          name="arrow"
          style="float: right"
          class="top_img"
        />
      </div>
      <div class="address_body">
        <van-icon name="location" class="address_location" />
        <span id="name">吴XX</span><span id="phone">18188888888</span><br />
        <span id="area">四川省成都市锦江区红星路一段创业园区A栋706室</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
};
</script>

<style lang="scss">
.addressList {
  
  margin-bottom: 8px;
  .top {
    background-color: #f5f5f5;
  }
  #name {
    font-size: 16px;
    font-weight: bold;
    margin-right: 6px;
  }
  #phone {
    color: #9e9e9e;
  }
  .body {
    background: #ffffff;
    height: 95px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
  }
  .address_top {
    height: 20px;
  }
  .address_location {
    float: left;
    font-size: 40px;
    line-height: 50px;
    color: #971818;
  }
  .top_img {
    color: #9e9e9e;
    font-size: 18px;
  }
  .address_body {
    text-align: left;
    font-size: 13px;
  }
}
</style>