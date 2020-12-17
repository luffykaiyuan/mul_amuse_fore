<template>
  <v-data-table :headers="headers" :items="storeList" sort-by="addTime" class="elevation-1"
                :footer-props="{itemsPerPageText: 'per page'}">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{collapsed?'商家列表':''}}</v-toolbar-title>
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
                    <v-text-field v-model="editedItem.storeName" label="商家名称"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.storeUsername" label="用户名"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.storePassword" label="密码"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.storePhone" label="电话"></v-text-field>
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
            <v-card-title class="headline">您确定要删除此商家吗？</v-card-title>
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
</template>
<script>
import publicJs, {request} from "../../plugins/js/publicJs";

export default {
  data: () => ({
    collapsed: publicJs.collapsed,
    editDialog: false,
    dialogDelete: false,
    headers: [
      { text: '商家ID', align: 'start', sortable: false, value: 'id',},
      { text: '商家名称', align: 'start', sortable: false, value: 'storeName',},
      { text: '用户名', sortable: false, value: 'storeUsername'  },
      { text: '密码', sortable: false, value: 'storePassword' },
      { text: '电话', sortable: false, value: 'storePhone' },
      { text: '上线时间', sortable: false, value: 'addTime' },
      { text: '操作', sortable: false, value: 'actions'},
    ],
    storeList: [],
    editedIndex: -1,
    editedItem: {
      storeName: '',
      storeUsername: '',
      storePassword: '',
      storePhone: '',
    },
    defaultItem: {
      storeName: '',
      storeUsername: '',
      storePassword: '',
      storePhone: '',
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新增商家' : '编辑商家'
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
    this.initStoreList()
  },

  methods: {
    initStoreList () {
      request({
        url:publicJs.urls.selectAllNormal,
        method:'get',
      }).then(res => {
        this.storeList = res.data;
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },

    editItem (item) {
      this.editedIndex = this.storeList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editDialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.storeList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      request({
        url:publicJs.urls.deleteStore + "?id=" + this.editedItem.id,
        method:'get',
      }).then(res => {
        this.$message.success("删除成功！！")
        this.initStoreList();
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
      if (this.editedIndex === -1){
        this.editedItem.operateId = localStorage.getItem("userToken");
        request({
          url:publicJs.urls.insertStore,
          method:'post',
          data: this.editedItem
        }).then(res => {
            this.$message.success("添加成功！！")
          this.initStoreList();
          this.close()
        }).catch(err => {
          this.$message.error(res.data)
        })
      }else {
        request({
          url:publicJs.urls.updateStore,
          method:'post',
          data: this.editedItem
        }).then(res => {
          this.$message.success("编辑成功！！")
          this.initStoreList();
          this.close()
        }).catch(err => {
          this.$message.error(res.data)
        })
      }
    },
  },
}
</script>
