<template>
  <div id="map" style="width:100%;height:900px;"></div>
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
    created () {
    },
    mounted() {
      // 百度地图API功能
      var map = new BMap.Map("map");    // 创建Map实例
      map.centerAndZoom(new BMap.Point(116.397128,39.916527), 16);  // 初始化地图,设置中心点坐标和地图级别
      //添加地图类型控件
      map.addControl(new BMap.MapTypeControl({
        mapTypes:[
          BMAP_NORMAL_MAP
        ]}));
      map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

      var point = new BMap.Point(116.397128,39.916527);
      map.centerAndZoom(point, 16);
      var marker = new BMap.Marker(point);        // 创建标注
      marker.setTitle("我是标题");
      map.addOverlay(marker);                     // 将标注添加到地图中
      // 设置标注动画效果。如果参数为null，则取消动画效果。该方法需要在addOverlay方法后设置
      marker.setAnimation(Animation);

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
</style>
