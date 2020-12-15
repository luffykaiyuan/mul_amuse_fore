<template>
  <div>
    <div id="l-map"></div>
    <div id="r-result">请输入:<input type="text" id="suggestId" size="20" value="百度" style="width:150px;" /></div>
    <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    watch: {
    },
    methods: {

    },
    async created () {
    },
    mounted() {
      function G(id) {
        return document.getElementById(id);
      }

      var map = new BMap.Map("l-map");
      map.centerAndZoom("北京",12);                   // 初始化地图,设置城市和地图级别。

      var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" : "suggestId"
          ,"location" : map
        });

      ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;
      });

      var myValue;
      ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
      })
    }
  }
</script>

<style lang="css">
  .BMap_cpyCtrl {
    display: none;
  }
  .anchorBL {
    display: none;
  }
  body, html{width: 100%;height: 100%;margin:0;font-family:"微软雅黑";font-size:14px;}
  #l-map{height:300px;width:100%;}
  #r-result{width:100%;}
</style>
