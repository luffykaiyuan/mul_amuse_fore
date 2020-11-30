<template>
  <v-data-table :headers="headers" :items="storeList" sort-by="addTime" class="elevation-1"
                :footer-props="{itemsPerPageText: 'per page'}">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{collapsed?'':'商家列表'}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
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
                    <v-text-field v-model="editedItem.storeAddress" label="地址"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.storePhone" label="电话"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.addTime" label="上线时间"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
import publicJs from "../../plugins/js/publicJs";

export default {
  data: () => ({
    collapsed: publicJs.collapsed,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: '商家名称', align: 'start', sortable: false, value: 'storeName',},
      { text: '用户名', sortable: false, value: 'storeUsername'  },
      { text: '密码', sortable: false, value: 'storePassword' },
      { text: '地址', sortable: false, value: 'storeAddress' },
      { text: '电话', value: 'storePhone' },
      { text: '上线时间', value: 'addTime' },
      { text: '操作', value: 'actions'},
    ],
    storeList: [],
    editedIndex: -1,
    editedItem: {
      storeName: '',
      storeUsername: '',
      storePassword: '',
      storeAddress: '',
      storePhone: '',
      addTime: '',
    },
    defaultItem: {
      storeName: '',
      storeUsername: '',
      storePassword: '',
      storeAddress: '',
      storePhone: '',
      addTime: '',
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.storeList = [
        {
          storeName: '1',
          storeUsername: '1',
          storePassword: '1',
          storeAddress: '1',
          storePhone: '1',
          addTime: '1',
        },
        {
          storeName: '2',
          storeUsername: '2',
          storePassword: '2',
          storeAddress: '2',
          storePhone: '2',
          addTime: '2',
        },
        {
          storeName: '3',
          storeUsername: '3',
          storePassword: '3',
          storeAddress: '3',
          storePhone: '3',
          addTime: '3',
        },
        {
          storeName: '4',
          storeUsername: '4',
          storePassword: '4',
          storeAddress: '4',
          storePhone: '4',
          addTime: '4',
        },
        {
          storeName: '5',
          storeUsername: '5',
          storePassword: '5',
          storeAddress: '5',
          storePhone: '5',
          addTime: '5',
        },
        {
          storeName: '6',
          storeUsername: '6',
          storePassword: '6',
          storeAddress: '6',
          storePhone: '6',
          addTime: '6',
        },
        {
          storeName: '7',
          storeUsername: '7',
          storePassword: '7',
          storeAddress: '7',
          storePhone: '7',
          addTime: '7',
        },
        {
          storeName: '8',
          storeUsername: '8',
          storePassword: '8',
          storeAddress: '8',
          storePhone: '8',
          addTime: '8',
        },
        {
          storeName: '9',
          storeUsername: '9',
          storePassword: '9',
          storeAddress: '9',
          storePhone: '9',
          addTime: '9',
        },
        {
          storeName: '10',
          storeUsername: '10',
          storePassword: '10',
          storeAddress: '10',
          storePhone: '10',
          addTime: '10',
        },
        {
          storeName: '11',
          storeUsername: '11',
          storePassword: '11',
          storeAddress: '11',
          storePhone: '11',
          addTime: '11',
        },
        {
          storeName: '12',
          storeUsername: '12',
          storePassword: '12',
          storeAddress: '12',
          storePhone: '12',
          addTime: '12',
        },
      ]
    },

    editItem (item) {
      this.editedIndex = this.storeList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.storeList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.storeList.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
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
      if (this.editedIndex > -1) {
        Object.assign(this.storeList[this.editedIndex], this.editedItem)
      } else {
        this.storeList.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
