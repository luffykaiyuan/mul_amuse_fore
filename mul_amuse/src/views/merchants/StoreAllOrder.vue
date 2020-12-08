<template>
  <v-card>
    <v-card-title>
      <v-text-field v-model="orderNumber" append-icon="mdi-magnify" label="订单编号" single-line hide-details
                    @click:append="initList"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="orderList" sort-by="status" class="elevation-1"
                  :footer-props="{itemsPerPageText: 'per page'}">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{collapsed?'订单列表':''}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.statusBack="{ item }">
        <v-chip :style="getColor(item.statusBack)" dark>
          {{ item.statusBack }}
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
    orderNumber: '',
    headers: [
      { text: '订单号', align: 'start', sortable: false, value: 'orderNumber',},
      { text: '产品名称', align: 'start', sortable: false, value: 'productTitle',},
      { text: '产品型号', sortable: false, value: 'modelName'  },
      { text: '货物数量', sortable: false, value: 'orderCount' },
      { text: '订单价格', sortable: false, value: 'orderPrice' },
      { text: '下单时间', sortable: false, value: 'addTime' },
      { text: '状态', sortable: false, value: 'statusBack'},
    ],
    orderList: [],
    orderListBack: [],
    editedIndex: -1,
  }),

  computed: {
  },

  watch: {
  },

  created () {
    this.storeId = localStorage.getItem("userToken");
    this.initList();
  },

  methods: {
    initList(){
      if (this.orderNumber){
        this.orderList = [];
        for (let i = 0; i < this.orderListBack.length; i++) {
          if (this.orderListBack[i].orderNumber === this.orderNumber){
            this.orderList[0] = this.orderListBack[i];
          }
        }
      }else{
        request({
          url:publicJs.urls.selectStoreOrder + "?storeId=" + this.storeId,
          method:'get',
        }).then(res => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].statusBack = this.formatterStatus(res.data[i].status);
          }
          this.orderList = res.data;
          this.orderListBack = res.data;
        }).catch(err => {
          this.$message.error("初始化错误！！")
        })
      }
    },
    formatterStatus(status){
      if (status === "1"){
        return "已支付";
      }else if (status === "2"){
        return "已核销";
      }else if (status === "3"){
        return "已发货";
      }else if (status === "4"){
        return "已完成";
      }else {
        return "已删除"
      }
    },
    getColor (statusBack) {
      if (statusBack === "已支付") return 'background: red'
      else if (statusBack === "已核销") return 'background: blue'
      else if (statusBack === "已发货") return 'background: yellow'
      else if (statusBack === "已完成") return 'background: green'
    },
  },
}
</script>
