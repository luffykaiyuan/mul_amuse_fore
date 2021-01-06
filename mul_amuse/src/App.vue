<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {},
}
</script>

<style lang='scss'>
  * {
    margin: 0;
    padding: 0;
  }
  .van-icon{
    user-select: none;
  }
  #app {
    font-family: Noto Sans SC;
    text-align: center;
    color: #2c3e50;
    background: #f5f5f5;
  }
  section {
    width: 94%;
    padding: 3% 3%;
    margin: 10px 0;
    background: white;
    header {
      margin: 5px 0;
      width: 100%;
      display: flex;
      label {
        margin-left: 5px;
        font-size: 20px;
      }
    }
  }
</style>

