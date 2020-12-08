<template>
  <v-data-table :headers="headers" :items="storeInfo" class="elevation-1" :hide-default-footer="true">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{collapsed?'商家信息':''}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
  </v-data-table>
</template>
<script>
import publicJs, {request} from "../../plugins/js/publicJs";

export default {
  data: () => ({
    collapsed: publicJs.collapsed,
    storeId: '',
    headers: [
      { text: '商家名称', align: 'start', sortable: false, value: 'storeName',},
      { text: '用户名', sortable: false, value: 'storeUsername'  },
      { text: '地址', sortable: false, value: 'storeAddress' },
      { text: '电话', sortable: false, value: 'storePhone' },
      { text: '上线时间', sortable: false, value: 'addTime' },
    ],
    storeInfo:[]
  }),

  computed: {
  },

  watch: {
  },

  created () {
    this.storeId = localStorage.getItem("userToken");
    this.initStoreInfo()
  },

  methods: {
    initStoreInfo () {
      request({
        url:publicJs.urls.selectStoreById + '?id=' + this.storeId,
        method:'get',
      }).then(res => {
        this.storeInfo = res.data;
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },
  },
}
</script>
<style>
thead * { margin: 0; padding: 0; border: 0 none; height: 0px; }
</style>

