<template>
  <v-card>
    <v-card-title>
      <v-text-field v-model="storeId" append-icon="mdi-magnify" label="商家ID" single-line hide-details
                    :autofocus="true" @click:append="searchAddress"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="addressList" sort-by="addTime" class="elevation-1"
                  :footer-props="{itemsPerPageText: 'per page'}" v-if="getTable">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{collapsed?'地址列表':''}}</v-toolbar-title>
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
                      <v-text-field v-model="editedItem.storeName" label="店铺名称"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.storeAddress" label="店铺地址"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.longitude" label="经度"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.latitude" label="纬度"></v-text-field>
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
              <v-card-title class="headline">您确定要删除此地址吗？</v-card-title>
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
    storeName: '',
    getTable: false,
    editDialog: false,
    dialogDelete: false,
    headers: [
      { text: '产品ID', align: 'start', sortable: false, value: 'id',},
      { text: '店铺名称', sortable: false, value: 'storeName'  },
      { text: '店铺地址', sortable: false, value: 'storeAddress' },
      { text: '经度', sortable: false, value: 'longitude' },
      { text: '纬度', sortable: false, value: 'latitude' },
      { text: '添加时间', sortable: false, value: 'addTime' },
      { text: '操作', sortable: false, value: 'actions'},
    ],
    addressList: [],
    editedIndex: -1,

    sureSelect: [{label:'否', value: '0'}, {label:'是', value: '1'}],
    editedItem: {
      storeName: '',
      storeAddress: '',
      longitude: '',
      latitude: '',
    },
    defaultItem: {
      storeName: '',
      storeAddress: '',
      longitude: '',
      latitude: '',
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新增地址' : '编辑地址'
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
    searchAddress (){
      if (this.storeId){
        request({
          url:publicJs.urls.selectAllByStoreId + "?storeId=" + this.storeId,
          method:'get',
        }).then(res => {
            this.addressList = res.data;
            this.getTable = true;
        }).catch(err => {
          this.$message.error("初始化错误！！")
        })
      } else {
        this.getTable = false;
        this.addressList = [];
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
      this.editedIndex = this.addressList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editDialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.addressList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      request({
        url:publicJs.urls.deleteAddress + "?id=" + this.editedItem.id,
        method:'get',
      }).then(res => {
        this.$message.success("删除成功！！")
        this.searchAddress();
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
          url:publicJs.urls.insertAddress,
          method:'post',
          data: this.editedItem
        }).then(res => {
          this.$message.success("添加成功！！")
          this.searchAddress();
          this.close()
        }).catch(err => {
          this.$message.error(res.data)
        })
      }else {
        request({
          url:publicJs.urls.updateAddress,
          method:'post',
          data: this.editedItem
        }).then(res => {
          this.$message.success("编辑成功！！")
          this.searchAddress();
          this.close()
        }).catch(err => {
          this.$message.error(res.data)
        })
      }
    },

  },
}
</script>
