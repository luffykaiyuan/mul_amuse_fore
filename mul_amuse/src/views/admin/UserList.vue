<template>
  <v-card>
    <v-card-title>
      <v-text-field v-model="userName" append-icon="mdi-magnify" label="用户名" single-line hide-details
                    :autofocus="true" @click:append="initUserList"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="userList" sort-by="addTime" class="elevation-1"
                  :footer-props="{itemsPerPageText: 'per page'}">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{collapsed?'用户列表':''}}</v-toolbar-title>
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
                      <v-select :items="sureSelect" item-text="label" item-value="value" v-model="editedItem.userRank" label="是否为超级会员"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select :items="titleSelect" item-text="label" item-value="value"  v-model="editedItem.userTitle" label="用户等级"></v-select>
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
    userName: '',
    editDialog: false,
    dialogDelete: false,
    sureSelect: [{label:'否', value: '0'}, {label:'是', value: '1'}],
    titleSelect: [{label:'游客', value: '0'}, {label:'初级达人', value: '1'},
      {label:'中级达人', value: '2'}, {label:'高级达人', value: '3'}],
    headers: [
      {text: '用户ID', align: 'start', sortable: false, value: 'id',},
      {text: '微信昵称', sortable: false, value: 'nickName'},
      {text: '电话', sortable: false, value: 'userPhone'},
      {text: '超级会员', sortable: false, value: 'userRankBack'},
      {text: '达人等级', sortable: false, value: 'userTitleBack'},
      {text: '消费金额', sortable: false, value: 'userCount'},
      {text: '加入时间', sortable: false, value: 'addTime'},
      {text: '操作', sortable: false, value: 'actions'},
    ],
    userList: [],
    editedIndex: -1,

    editedItem: {
      userRank: '',
      userTitle: '',
    },
    defaultItem: {
      id: '',
      userName: '',
      password: '',
      wechatNumber: '',
      headImg: '',
      nickName: '',
      userPhone: '',
      userRank: '',
      userTitle: '',
      userCount: 0.0,
      userInvite: '',
      inviteNumber: 0,
      fatherId: '',
      fatherTitle: '',
      fatherSupport: 0.0,
      grandId: '',
      grandTitle: '',
      grandSupport: 0.0,
      addTime: '',
      status: '',
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新增用户' : '编辑用户'
    },
  },

  watch: {
    editDialog(val) {
      val || this.close()
    },
  },

  created() {
    this.initUserList()
  },

  methods: {
    initUserList(){
      if (this.userName){
        request({
          url: publicJs.urls.selectUerByUsername + "?userName=" + this.userName,
          method: 'get',
        }).then(res => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].userRankBack = this.formatterSuper(res.data[i].userRank);
            res.data[i].userTitleBack = this.formatterTitle(res.data[i].userTitle);
          }
          this.userList = res.data;
        }).catch(err => {
          this.$message.error("初始化错误！！")
        })
      } else{
        request({
          url: publicJs.urls.selectAllNormalUser,
          method: 'get',
        }).then(res => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].userRankBack = this.formatterSuper(res.data[i].userRank);
            res.data[i].userTitleBack = this.formatterTitle(res.data[i].userTitle);
          }
          this.userList = res.data;
        }).catch(err => {
          this.$message.error("初始化错误！！")
        })
      }
    },

    formatterSuper(userRank){
      if (userRank === "1"){
        return "是";
      }else {
        return "否";
      }
    },

    formatterTitle(userTitle){
      if (userTitle === "0"){
        return "游客";
      }else if(userTitle === "1") {
        return "初级达人";
      }else if(userTitle === "2"){
        return "中级达人";
      }else {
        return "高级达人";
      }
    },

    editItem(item) {
      this.editedIndex = this.userList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editDialog = true
    },

    close() {
      this.editDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      request({
        url: publicJs.urls.updateUser,
        method: 'post',
        data: this.editedItem
      }).then(res => {
        this.$message.success("编辑成功！！")
        this.initUserList();
        this.close()
      }).catch(err => {
        this.$message.error(res.data)
      })
    },
  },
}
</script>
