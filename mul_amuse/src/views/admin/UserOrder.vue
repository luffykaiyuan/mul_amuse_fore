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
          <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="24">
                      <v-select :items="statusSelect" item-text="label" item-value="value" v-model="editedItem.status" label="订单状态"></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  关闭
                </v-btn>
                <v-btn color="red" text @click="save">
                  保存
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" id="editStyle">
          mdi-pencil
        </v-icon>
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
    editDialog: false,
    statusSelect: [{label:'删除', value: '0'}, {label:'已支付/待核销/未发货', value: '1'},
      {label:'已核销', value: '2'}, {label:'已发货', value: '3'}, {label:'已完成', value: '4'}],
    headers: [
      { text: '订单号', align: 'start', sortable: false, value: 'orderNumber',},
      { text: '产品名称', align: 'start', sortable: false, value: 'productTitle',},
      { text: '产品型号', sortable: false, value: 'modelName'  },
      { text: '货物数量', sortable: false, value: 'orderCount' },
      { text: '订单价格', sortable: false, value: 'orderPrice' },
      { text: '下单时间', sortable: false, value: 'addTime' },
      { text: '状态', sortable: false, value: 'statusBack'},
      { text: '操作', sortable: false, value: 'actions'},
    ],
    orderList: [],
    editedIndex: -1,
    editedItem: {
      status: ''
    },
    defaultItem: {
      status: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '编辑订单' : '编辑订单'
    },
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
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].statusBack = this.formatterStatus(res.data[i].status);
          }
          this.orderList = res.data;
          this.getTable = true;// }
        }).catch(err => {
          this.$message.error("初始化错误！！")
        })
      } else {
        this.getTable = false;
        this.orderList = [];
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

    editItem (item) {
      this.editedIndex = this.orderList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editDialog = true
    },

    close () {
      this.editDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      request({
        url:publicJs.urls.updateOrder,
        method:'post',
        data: this.editedItem
      }).then(res => {
        this.$message.success("编辑成功！！")
        this.searchOrder();
        this.close()
      }).catch(err => {
        this.$message.error(res.data)
      })
    },
  },
}
</script>
