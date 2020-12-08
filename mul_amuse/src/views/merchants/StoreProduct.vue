<template>
  <v-card>
    <v-data-table :headers="headers" :items="productList" sort-by="productSaleVolume" class="elevation-1"
                  :footer-props="{itemsPerPageText: 'per page'}" sort-desc>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{collapsed?'产品列表':''}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.productTypeBack="{ item }">
        <v-chip :style="getColor(item.productTypeBack)" dark>
          {{ item.productTypeBack }}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import publicJs, {request} from "../../plugins/js/publicJs";

export default {
  data: () => ({
    collapsed: publicJs.collapsed,
    storeId: '',
    headers: [
      { text: '产品ID', align: 'start', sortable: false, value: 'id',},
      { text: '产品名称', align: 'start', sortable: false, value: 'productTitle',},
      { text: '产品类型', sortable: false, value: 'productTypeBack'  },
      { text: '是否免费', sortable: false, value: 'productFreeBack' },
      { text: '产品现价', sortable: false, value: 'productNowPrice' },
      { text: '产品销量', sortable: false, value: 'productSaleVolume' },
      { text: '添加时间', sortable: false, value: 'addTime' },
    ],
    productList: [],
  }),

  computed: {
  },

  watch: {
  },

  created () {
    this.storeId = localStorage.getItem("userToken");
    this.initProduct();
  },

  methods: {
    initProduct(){
      request({
        url:publicJs.urls.selectProductByStore + "?storeId=" + this.storeId,
        method:'get',
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].productTypeBack = this.formatterType(res.data[i].productType);
          res.data[i].productFreeBack = this.formatterFree(res.data[i].productFree);
        }
        this.productList = res.data;
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },
    searchProduct (){
    },

    formatterType(productType){
      if (productType === "0"){
        return "虚拟产品";
      }
      if (productType === "1"){
        return "实体产品";
      }
      if (productType === "2"){
        return "预约产品";
      }
    },
    formatterFree(productFree){
      if (productFree === "1"){
        return "是";
      }else {
        return "否";
      }
    },
    getColor (productTypeBack) {
      if (productTypeBack === "虚拟产品") return 'background: red'
      else if (productTypeBack === "实体产品") return 'background: blue'
      else return 'background: green'
    },
  },
}
</script>
