<template>
  <v-card>
    <v-card-title>
      <v-text-field v-model="userId" append-icon="mdi-magnify" label="用户ID" single-line hide-details
                    :autofocus="true" @click:append="searchOrder"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="orderList" sort-by="addTime" class="elevation-1"
                  :footer-props="{itemsPerPageText: 'per page'}" v-if="getTable">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{collapsed?'订单列表':''}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import publicJs, {request} from "../../plugins/js/publicJs";

export default {
  data: () => ({
    collapsed: publicJs.collapsed,
    userId: '',
    getTable: false,
    headers: [
      { text: '订单号', align: 'start', sortable: false, value: 'orderNumber',},
      { text: '产品名称', align: 'start', sortable: false, value: 'productTitle',},
      { text: '产品型号', sortable: false, value: 'modelName'  },
      { text: '货物数量', sortable: false, value: 'orderCount' },
      { text: '订单价格', sortable: false, value: 'orderPrice' },
      { text: '下单时间', sortable: false, value: 'addTime' },
      { text: '状态', sortable: false, value: 'status'},
    ],
    orderList: [],
    editedIndex: -1,
  }),

  computed: {
  },

  watch: {
  },

  created () {
  },

  methods: {
    searchOrder (){
      if (this.userId){
        request({
          url:publicJs.urls.selectUserOrder + "?userId=" + this.userId,
          method:'get',
        }).then(res => {
          // if (res.data.length){
          this.orderList = res.data;
          this.getTable = true;
          // }else {
          //   this.$message.warning("请确保商家ID正确！！")
          // }
        }).catch(err => {
          this.$message.error("初始化错误！！")
        })
      } else {
        this.getTable = false;
        this.orderList = [];
      }
    },

  },
}
</script>
