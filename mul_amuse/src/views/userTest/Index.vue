<template>
  <div style="margin: 50px">
    <a-space size="large">
      <a-card hoverable style="width: 300px" v-for="item in productList" :key="item.id">
        <img slot="cover" alt="example" :src="item.productCoverImg" style="height: 180px; width: 300px;" v-if="item.productCoverImg"/>
        <img slot="cover" alt="example" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607427243890&di=a681ceadb3ccf5bcede860a78a35b5c1&imgtype=0&src=http%3A%2F%2Fsecretkeycrm.digifilm.com.cn%2Fupload%2F20180530%2Fe676f667c4cdfc7e074898adab2622f2.jpg" style="height: 180px; width: 300px;" v-else/>
        <template slot="actions" class="ant-card-actions">
          <a-row v-if="item.saleOut === '0'">
            <a-col :span="12">
              <a-button html-type="submit">
                <a-icon type="tag" />{{item.productNowPrice}}￥
              </a-button>
            </a-col>
            <a-col :span="12">
              <a-button type="primary" html-type="submit" style="color: white">
                <a-icon type="dollar" />佣金:{{item.commissionLow}}~{{item.commissionHeigh}}
              </a-button>
            </a-col>
            <a-col :span="12" :offset="12">
              <a-button html-type="submit" @click="toShop(item)">
                <a-icon type="shopping" />查看详情
              </a-button>
            </a-col>
          </a-row>
          <a-button type="danger"  html-type="submit" v-if="item.saleOut === '1'" @click="noStock" style="color: white">
            <a-icon type="redo" />暂无库存
          </a-button>
        </template>
        <a-card-meta :title="item.productTitle" :description="item.storeName"></a-card-meta>
      </a-card>
    </a-space>
  </div>
</template>



<script>
import publicJs, {request} from "../../plugins/js/publicJs";
import axios from "axios";

export default {
  data: () => ({
    productList: [],
  }),
  created() {
    this.initProduct();
  },
  methods: {
    //初始化数据
    initProduct(){
      request({
        url:publicJs.urls.selectIndexProduct,
        method:'get',
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].productCoverImg = this.getImg(res.data[i].productCoverImg);
        }
        this.productList = res.data;
      })
    },
    //图片获取路径拼接
    getImg(id){
      if (id){
        return axios.defaults.baseURL + publicJs.urls.selectFile + "?id=" + id;
      } else {
        return "";
      }
    },
    //购物跳转
    toShop(item){
      this.$router.push("/productDetail/" + item.id + "/");
    },
    //没库存提示
    noStock(){
      this.$message.warning("暂无库存，联系商家添加库存！！")
    }
  },
}
</script>

<style scoped>

</style>
