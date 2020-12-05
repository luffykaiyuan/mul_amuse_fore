<template>
  <div style="height: 100%">
    <v-card style="height: 100%">
      <v-card-title>
        <v-text-field v-model="userId" append-icon="mdi-magnify" label="用户ID" single-line hide-details
                      :autofocus="true" @click:append="initData"></v-text-field>
      </v-card-title>
      <v-card-text>
      <el-row v-if="getTable">
        <el-col :span="17" :offset="1">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>详细信息</span>
              <el-button style="float: right; padding: 3px 0; color: rgb(64, 169, 255);" type="text" @click="cashout">全部提现</el-button>
            </div>
            <el-table ref="filterTable" :data="commissionList" style="width: 100%">
<!--              <el-table-column type="selection" :selectable="checkSelectable" width="55"></el-table-column>-->
              <el-table-column prop="orderNumber" label="订单编号"></el-table-column>
              <el-table-column prop="provideId" label="提供人ID"></el-table-column>
              <el-table-column prop="provideName" label="提供人姓名"></el-table-column>
              <el-table-column prop="getMoney" label="获得佣金"></el-table-column>
              <el-table-column prop="addTime" label="添加时间"></el-table-column>
              <el-table-column prop="status" label="标签">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.status === '1' ? 'primary' : 'success'" disable-transitions>{{scope.row.statusBack}}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-card class="box-card">
            <el-table :data="cashoutList" style="width: 100%">
              <el-table-column prop="moneyNumber" label="提现金额"></el-table-column>
              <el-table-column prop="addTime" label="时间"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import publicJs, {request} from "../../plugins/js/publicJs";

export default {
  data() {
    return {
      getTable: false,
      userId: '',
      commissionList: [{
        orderNumber: '',
        provideId: '',
        provideName: '',
        getMoney: '',
        addTime: '',
        status: '',
        statusBack: ''
      }],
      cashoutList: [{
        moneyNumber: 0.0,
        addTime: ""
      }],
      cashoutLog:{
        userId: "",
        moneyNumber: 0.0
      },
    }
  },
  created() {

  },
  methods: {
    initData(){
      if (this.userId){
        this.getTable = true;
        this.searchCommission();
        this.searchCashout();
      }else {
        this.getTable = false;
      }
    },
    searchCommission(){
      request({
        url:publicJs.urls.selectUserCommissionLog + "?getId=" + this.userId,
        method:'get',
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].status === "1"){
            this.cashoutLog.moneyNumber += res.data[i].getMoney;
            res.data[i].statusBack = "待提现";
          }else if (res.data[i].status === "2"){
            res.data[i].statusBack = "已完成";
          }
        }
        this.commissionList = res.data;
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },
    searchCashout(){
      request({
        url:publicJs.urls.selectUserCashout + "?userId=" + this.userId,
        method:'get',
      }).then(res => {
        this.cashoutList = res.data;
      }).catch(err => {
        this.$message.error("初始化错误！！")
      })
    },
    // checkSelectable(row) {
    //   if (row.status === "1"){
    //     return true;
    //   }else {
    //     return false;
    //   }
    // },
    cashout(){
      this.$confirm('用户 ' + this.userId + ' 的提现金额为 ' + this.cashoutLog.moneyNumber + '元， 是否为他提现？')
        .then(_ => {
          this.cashoutLog.userId = this.userId;
          request({
            url:publicJs.urls.insertCashoutLog,
            method:'post',
            data: this.cashoutLog
          }).then(res => {
            this.initData();
            this.cashoutLog.moneyNumber = 0.0;
            this.$message.success("提现成功！！")
          }).catch(err => {
            this.$message.error(res.data)
          })
        })
        .catch(_ => {});
    },
  }
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
</style>
