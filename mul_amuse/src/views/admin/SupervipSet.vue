<template>
  <v-data-table :headers="headers" :items="supervipList" sort-by="addTime" class="elevation-1"
                :hide-default-footer="true">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{collapsed?'超会设置':''}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="editDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.supervipMoney" label="超会价格"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.dicountNumber" label="超会折扣"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.payHaveNumber" label="购买次数"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.inviteNumber" label="邀请人数"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.inviteHaveNumber" label="邀请次数"></v-text-field>
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
</template>
<script>
import publicJs, {request} from "../../plugins/js/publicJs";

export default {
  data: () => ({
    collapsed: publicJs.collapsed,
    editDialog: false,
    headers: [
      { text: '超会价格', align: 'start', sortable: false, value: 'supervipMoney',},
      { text: '超会折扣', align: 'start', sortable: false, value: 'dicountNumber',},
      { text: '购买次数', sortable: false, value: 'payHaveNumber'  },
      { text: '邀请人数', sortable: false, value: 'inviteNumber' },
      { text: '邀请次数', sortable: false, value: 'inviteHaveNumber' },
      { text: '操作', sortable: false, value: 'actions'},
    ],
    supervipList: [],
    editedIndex: -1,
    editedItem: {
      supervipMoney: 0.0,
      dicountNumber: 0,
      payHaveNumber: 0,
      inviteNumber: 0,
      inviteHaveNumber: 0,
    },
    defaultItem: {
      supervipMoney: 0.0,
      dicountNumber: 0,
      payHaveNumber: 0,
      inviteNumber: 0,
      inviteHaveNumber: 0,
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
  },

  created () {
    this.initSupervipList()
  },

  methods: {
    initSupervipList () {
      request({
        url:publicJs.urls.selectSupervipSet,
        method:'get',
      }).then(res => {
        this.supervipList = res.data;
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },

    editItem (item) {
      this.editedIndex = this.supervipList.indexOf(item)
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
        url:publicJs.urls.updateSupervipSet,
        method:'post',
        data: this.editedItem
      }).then(res => {
        this.$message.success("编辑成功！！")
        this.initSupervipList();
        this.close()
      }).catch(err => {
        this.$message.error(res.data)
      })
    },
  },
}
</script>
