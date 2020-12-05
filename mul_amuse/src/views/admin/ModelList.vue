<template>
  <v-card>
    <v-card-title>
      <v-text-field v-model="productId" append-icon="mdi-magnify" label="产品ID" single-line hide-details
                    :autofocus="true" @click:append="searchModel"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="modelList" sort-by="addTime" class="elevation-1"
                  :footer-props="{itemsPerPageText: 'per page'}" v-if="getTable">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{collapsed?'型号列表':''}}</v-toolbar-title>
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
                      <v-text-field v-model="editedItem.modelName" label="型号名称"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.modelStock" label="库存"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.modelPrice" label="价格"></v-text-field>
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
              <v-card-title class="headline">您确定要删除此型号吗？</v-card-title>
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
    productId: '',
    getTable: false,
    editDialog: false,
    dialogDelete: false,
    headers: [
      { text: '型号名称', sortable: false, value: 'modelName'  },
      { text: '库存', sortable: false, value: 'modelStock' },
      { text: '价格', sortable: false, value: 'modelPrice' },
      { text: '操作', sortable: false, value: 'actions'},
    ],
    modelList: [],
    editedIndex: -1,
    editedItem: {
      productId: '',
      modelName: '',
      modelStock: 0,
      modelPrice: 0.0,
    },
    defaultItem: {
      productId: '',
      modelName: '',
      modelStock: 0,
      modelPrice: 0.0,
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新增型号' : '编辑型号'
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
    searchModel (){
      if (this.productId){
        request({
          url:publicJs.urls.selectModelByProduct + "?productId=" + this.productId,
          method:'get',
        }).then(res => {
          // if (res.data.length){
          this.modelList = res.data;
          this.getTable = true;
          // }else {
          //   this.$message.warning("请确保产品ID正确！！")
          // }
        }).catch(err => {
          this.$message.error("初始化错误！！")
        })
      } else {
        this.getTable = false;
        this.modelList = [];
      }

    },

    editItem (item) {
      this.editedIndex = this.modelList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editDialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.modelList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      request({
        url:publicJs.urls.deleteModel + "?id=" + this.editedItem.id,
        method:'get',
      }).then(res => {
        this.$message.success("删除成功！！")
        this.searchModel();
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
      this.editedItem.productId = this.productId;
      if (this.editedIndex === -1){
        request({
          url:publicJs.urls.insertModel,
          method:'post',
          data: this.editedItem
        }).then(res => {
          this.$message.success("添加成功！！")
          this.searchModel();
          this.close()
        }).catch(err => {
          this.$message.error(res.data)
        })
      }else {
        request({
          url:publicJs.urls.updateModel,
          method:'post',
          data: this.editedItem
        }).then(res => {
          this.$message.success("编辑成功！！")
          this.searchModel();
          this.close()
        }).catch(err => {
          this.$message.error(res.data)
        })
      }
    },

  },
}
</script>
