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
          <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-data-table :headers="detailHeaders" :items="detailInfo" class="elevation-1" :hide-default-footer="true"></v-data-table>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.postNumber" label="快递单号"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  关闭
                </v-btn>
                <v-btn color="red" text @click="sendProduct">
                  发货
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn class="ma-2" @click="openSend(item)">
          <v-icon id="editStyle" class="mr-2">
            mdi-arrow-up-bold-box-outline
          </v-icon>
          发货
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
      postNumber: ''
    },
    defaultItem: {
      postNumber: ''
    },
    detailHeaders: [
      { text: '订单号', align: 'start', sortable: false, value: 'orderNumber',},
      { text: '产品名称', align: 'start', sortable: false, value: 'productTitle',},
      { text: '型号', sortable: false, value: 'modelName'  },
      { text: '数量', sortable: false, value: 'orderCount'  },
      { text: '收货人姓名', sortable: false, value: 'receiveName'  },
      { text: '收货人电话', sortable: false, value: 'receivePhone'  },
      { text: '收货地址', sortable: false, value: 'receiveAddress'  },
      { text: '价格', sortable: false, value: 'orderPrice' },
      { text: '备注', sortable: false, value: 'orderRemark' },
      { text: '下单时间', sortable: false, value: 'addTime' },
    ],
    detailInfo: [],
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
          url:publicJs.urls.selectStoreRealOrder + "?storeId=" + this.storeId,
          method:'get',
        }).then(res => {
          this.orderList = res.data;
          this.orderListBack = res.data;
        }).catch(err => {
          this.$message.error("初始化错误！！")
        })
      }
    },

    openSend(item){
      this.editedItem = Object.assign({}, item)
      request({
        url:publicJs.urls.selectById + "?id=" + item.receiveId,
        method:'get',
      }).then(res => {
        this.detailInfo = res.data;
        this.detailInfo[0].orderNumber = item.orderNumber;
        this.detailInfo[0].productTitle = item.productTitle;
        this.detailInfo[0].modelName = item.modelName;
        this.detailInfo[0].orderCount = item.orderCount;
        this.detailInfo[0].orderPrice = item.orderPrice;
        this.detailInfo[0].orderRemark = item.orderRemark;
        this.detailInfo[0].addTime = item.addTime;
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
      this.editDialog = true;
    },
    close () {
      this.editDialog = false
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
