<template>
  <v-card>
    <v-card-title>
      <v-text-field v-model="storeId" append-icon="mdi-magnify" label="商家ID" single-line hide-details
                    :autofocus="true" @click:append="searchProduct"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="productList" sort-by="addTime" class="elevation-1"
                  :footer-props="{itemsPerPageText: 'per page'}" v-if="getTable">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{collapsed?'产品列表':''}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="editDialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ma-2" outlined small fab color="#1890FF" v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.productTitle" label="产品名称"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select :items="typeSelect" item-text="label" item-value="value" v-model="editedItem.productType" label="产品类型"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select :items="sureSelect" item-text="label" item-value="value"  v-model="editedItem.productFree" label="免费购"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select :items="saleStatusSelect" item-text="label" item-value="value"  v-model="editedItem.productSaleStatus" label="销售状态"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-dialog ref="dialog" v-model="saleTimeModal" :return-value.sync="editedItem.productSaleTime" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="editedItem.productSaleTime" label="开售时间" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.productSaleTime" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="saleTimeModal = false">
                            Cancel
                          </v-btn>
                          <v-btn text color="primary" @click="$refs.dialog.save(editedItem.productSaleTime)">
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.productOriginalPrice" label="门市价"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.productNowPrice" label="现价"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.productVipPrice" label="会员价"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.productSaleVolume" label="销量"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.maxAppointment" label="预约人数"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-dialog ref="endDialog" v-model="endTimeModal" :return-value.sync="editedItem.productEndTime" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="editedItem.productEndTime" label="停售时间" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.productEndTime" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="endTimeModal = false">
                            Cancel
                          </v-btn>
                          <v-btn text color="primary" @click="$refs.endDialog.save(editedItem.productEndTime)">
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.commissionHeigh" label="高佣金"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.commissionMiddle" label="中佣金"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.commissionLow" label="低佣金"></v-text-field>
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
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">您确定要删除此产品吗？</v-card-title>
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
        <v-icon small class="mr-2" @click="editItem(item)" id="editStyle">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)"  id="deleteStyle">
          mdi-delete
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
    storeId: '',
    getTable: false,
    editDialog: false,
    dialogDelete: false,
    headers: [
      { text: '产品ID', align: 'start', sortable: false, value: 'id',},
      { text: '产品名称', align: 'start', sortable: false, value: 'productTitle',},
      { text: '产品类型', sortable: false, value: 'productTypeBack'  },
      { text: '是否免费', sortable: false, value: 'productFreeBack' },
      { text: '产品现价', sortable: false, value: 'productNowPrice' },
      { text: '产品销量', sortable: false, value: 'productSaleVolume' },
      { text: '添加时间', sortable: false, value: 'addTime' },
      { text: '操作', sortable: false, value: 'actions'},
    ],
    productList: [],
    editedIndex: -1,

    typeSelect: [{label:'虚拟产品', value: '0'}, {label:'实体产品', value: '1'}, {label:'预约产品', value: '2'}],
    sureSelect: [{label:'否', value: '0'}, {label:'是', value: '1'}],
    saleStatusSelect: [{label:'销售', value: '1'}, {label:'预售', value: '2'}],
    saleTimeModal: false,
    endTimeModal: false,
    editedItem: {
      storeId: '',
      productType: '',
      productFree: '',
      productTitle: '',
      productSaleStatus: '',
      productSaleTime: new Date().toISOString().substr(0, 10),
      productOriginalPrice: 0.0,
      productNowPrice: 0.0,
      productVipPrice: 0.0,
      productSaleVolume: 0,
      maxAppointment: 0,
      productEndTime: new Date().toISOString().substr(0, 10),
      commissionHeigh: 0.0,
      commissionMiddle: 0.0,
      commissionLow: 0.0,
    },
    defaultItem: {
      storeId: '',
      productType: '',
      productFree: '',
      productTitle: '',
      productSaleStatus: '',
      productSaleTime: '',
      productOriginalPrice: 0.0,
      productNowPrice: 0.0,
      productVipPrice: 0.0,
      productSaleVolume: 0,
      maxAppointment: 0,
      productEndTime: '',
      commissionHeigh: 0.0,
      commissionMiddle: 0.0,
      commissionLow: 0.0,
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新增产品' : '编辑产品'
    },
  },

  watch: {
    editDialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
  },

  methods: {
    searchProduct (){
      if (this.storeId){
        request({
          url:publicJs.urls.selectProductByStore + "?storeId=" + this.storeId,
          method:'get',
        }).then(res => {
          // if (res.data.length){
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].productTypeBack = this.formatterType(res.data[i].productType);
            res.data[i].productFreeBack = this.formatterFree(res.data[i].productFree);
          }
            this.productList = res.data;
            this.getTable = true;
          // }else {
          //   this.$message.warning("请确保商家ID正确！！")
          // }
        }).catch(err => {
          this.$message.error("初始化错误！！")
        })
      } else {
        this.getTable = false;
        this.productList = [];
      }

    },

    formatterType(productType){
      if (productType === "0"){
        return "虚拟产品";
      }
      if (productType === "虚拟产品"){
        return "0";
      }
      if (productType === "1"){
        return "实体产品";
      }
      if (productType === "实体产品"){
        return "1";
      }
      if (productType === "2"){
        return "预约产品";
      }
      if (productType === "预约产品"){
        return "02";
      }
    },
    formatterFree(productFree){
      if (productFree === "1"){
        return "是";
      }else {
        return "否";
      }
    },

    editItem (item) {
      this.editedIndex = this.productList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editDialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.productList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      request({
        url:publicJs.urls.deleteProduct + "?id=" + this.editedItem.id,
        method:'get',
      }).then(res => {
        this.$message.success("删除成功！！")
        this.searchProduct();
        this.closeDelete()
      }).catch(err => {
        this.$message.error(res.data)
      })
    },

    close () {
      this.editDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      this.editedItem.storeId = this.storeId;
      if (this.editedIndex === -1){
        this.editedItem.operateId = localStorage.getItem("userToken");
        request({
          url:publicJs.urls.insertProduct,
          method:'post',
          data: this.editedItem
        }).then(res => {
          this.$message.success("添加成功！！")
          this.searchProduct();
          this.close()
        }).catch(err => {
          this.$message.error(res.data)
        })
      }else {
        request({
          url:publicJs.urls.updateProduct,
          method:'post',
          data: this.editedItem
        }).then(res => {
          this.$message.success("编辑成功！！")
          this.searchProduct();
          this.close()
        }).catch(err => {
          this.$message.error(res.data)
        })
      }
    },

  },
}
</script>
