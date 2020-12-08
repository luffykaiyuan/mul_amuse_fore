<template>
  <v-card>
    <v-card-title>
      <v-text-field v-model="orderNumber" append-icon="mdi-magnify" label="订单编号" single-line hide-details
                    @click:append="initOrder"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="orderList" sort-by="status" class="elevation-1"
                  :footer-props="{itemsPerPageText: 'per page'}" sort-desc>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{collapsed?'订单列表':''}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">您确定要核销订单号为：{{editedItem.orderNumber}}吗？</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">确认</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn class="ma-2" @click="deleteItem(item)">
          核销
          <v-icon  id="editStyle" class="mr-2">
            mdi-checkbox-marked-circle
          </v-icon>
        </v-btn>
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
    dialogDelete: false,
    headers: [
      { text: '订单号', align: 'start', sortable: false, value: 'orderNumber',},
      { text: '产品名称', align: 'start', sortable: false, value: 'productTitle',},
      { text: '型号', sortable: false, value: 'modelName'  },
      { text: '数量', sortable: false, value: 'orderCount'  },
      { text: '价格', sortable: false, value: 'orderPrice' },
      { text: '备注', sortable: false, value: 'orderRemark' },
      { text: '下单时间', sortable: false, value: 'addTime' },
      { text: '操作', sortable: false, value: 'actions'},
    ],
    orderList: [],
    orderListBack: [],
    formTitle: '发货信息',
    editDialog: false,
    editedItem: {
    },
    defaultItem: {
    },
  }),

  computed: {
  },

  watch: {
  },

  created () {
    this.storeId = localStorage.getItem("userToken");
    this.initOrder();
  },

  methods: {
    initOrder(){
      if (this.orderNumber){
        this.orderList = [];
        for (let i = 0; i < this.orderListBack.length; i++) {
          if (this.orderListBack[i].orderNumber === this.orderNumber){
            this.orderList[0] = this.orderListBack[i];
          }
        }
      }else {
        request({
          url:publicJs.urls.selectStoreNetOrder + "?storeId=" + this.storeId,
          method:'get',
        }).then(res => {
          this.orderList = res.data;
          this.orderListBack = res.data;
        }).catch(err => {
          this.$message.error("初始化错误！！")
        })
      }
    },

    deleteItem (item) {
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      request({
        url:publicJs.urls.destoryCodeNumber + "?qrcodeNumber=" + this.editedItem.qrcodeNumber,
        method:'get',
      }).then(res => {
        this.$message.success("核销成功！！")
        this.initOrder();
        this.closeDelete()
      }).catch(err => {
        this.$message.error(res.data)
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },

    sendProduct(){
      request({
        url:publicJs.urls.sendProduct,
        method:'post',
        data: this.editedItem,
      }).then(res => {
        this.$message.success("发货成功！！")
        this.editDialog = false
        this.initOrder();
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    }
  },
}
</script>
