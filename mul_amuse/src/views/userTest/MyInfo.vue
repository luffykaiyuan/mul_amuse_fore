<template>
  <div>
    <a-row>
      <el-col :offset="8">
        <a-card title="个人中心" style="width: 400px">
          <a slot="extra" @click="becomeTalent" v-if="userInfo.userTitle === '0'">成为达人</a>
          <a slot="extra" v-else>{{userInfo.userTitleBack}}</a>
          <a-row>
            <el-col :span="24">
              <a-button style="width: 100%;" @click="lookOrder">
                我的订单
              </a-button>
            </el-col>
            <el-col :span="24">
              <a-button style="width: 100%;" @click="lookTeam">
                我的团队
              </a-button>
            </el-col>
            <el-col :span="24">
              <a-button style="width: 100%;" @click="lookCommission">
                我的佣金
              </a-button>
            </el-col>
            <el-col :span="24">
              <a-button style="width: 100%;" @click="openReceive">
                编辑收货地址
              </a-button>
            </el-col>
            <el-col :span="24">
              <a-button style="width: 100%;" @click="lookReceive">
                默认收货地址管理
              </a-button>
            </el-col>
            <el-col :span="24">
              <a-button style="width: 100%;" @click="loginOut">
                退出登录
              </a-button>
            </el-col>
          </a-row>
        </a-card>
      </el-col>
    </a-row>
    <el-dialog title="成为达人" :visible.sync="dialogVisible">
      <el-form :model="talentInfo">
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="talentInfo.userPhone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTalent">确 定</el-button>
      </div>
    </el-dialog>
    <a-modal v-model="orderVisible" title="我的订单" centered :width="1500">
      <a-card style="width:100%" :tab-list="tabListNoTitle" :active-tab-key="noTitleKey" @tabChange="key => onTabChange(key, 'noTitleKey')">
        <a-table :columns="orderColumns" :data-source="noTitleKey==='0' ? netList : noTitleKey==='1' ? realList : apponinList">
          <span slot="status" slot-scope="status">
            <a-tag v-if="status === '1'" color="blue">
              已支付
            </a-tag>
            <a-tag v-if="status === '2'" color="red">
              已核销
            </a-tag>
            <a-tag v-if="status === '3'" color="yellow">
              已发货
            </a-tag>
            <a-tag v-if="status === '4'" color="green">
              已完成
            </a-tag>
          </span>
          <span slot="action" slot-scope="text, record">
            <a>Delete</a>
          </span>
        </a-table>
      </a-card>
    </a-modal>
    <a-modal v-model="teamVisible" title="我的团队" centered :width="1000">
      <a-card>
        <a-card-grid style="width:100%;text-align:center">
          <a-list class="comment-list" :header="myCommission" item-layout="horizontal" :data-source="teamList">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-comment :author="item.nickName">
                <a-descriptions bordered
                  :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
                  <a-descriptions-item label="一共消费">
                    {{item.userCount}}
                  </a-descriptions-item>
                  <a-descriptions-item label="为您带来的收益">
                    {{item.fatherSupport}}
                  </a-descriptions-item>
                </a-descriptions>
              </a-comment>
            </a-list-item>
          </a-list>
        </a-card-grid>
      </a-card>
    </a-modal>
    <a-modal v-model="commissionVisible" title="我的佣金" centered :width="1000">
      <a-card style="width:100%" :tab-list="commissionNoTitle" :active-tab-key="commissionTitleKey" @tabChange="key => onTabChange(key, 'commissionTitleKey')">
        <a-list item-layout="horizontal" :data-source="commissionLogList" v-if="commissionTitleKey === 'myCommission'">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta
              :description="item.description"
            >
              <a slot="title" href="https://www.antdv.com/">{{ item.provideName }}</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
        <a-list item-layout="horizontal" :data-source="cashoutList" v-else-if="commissionTitleKey === 'cashoutLog'">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta
              :description="item.description"
            >
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-card>
    </a-modal>
    <a-modal v-model="editReceive" title="编辑地址" centered :width="1500">
      <a-button type="primary" @click="insertOneReceive" style="color: white">
        新增地址
      </a-button>
      <el-table :data="receiveList" border style="width: 100%">
        <el-table-column prop="receiveName" label="收货人姓名"></el-table-column>
        <el-table-column prop="receivePhone" label="收货人电话"></el-table-column>
        <el-table-column prop="receiveAddress" label="地址"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" style="color: rgb(24, 144, 255);" @click="editOneReceive(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </a-modal>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="收货人姓名" :label-width="formLabelWidth">
          <el-input v-model="form.receiveName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人电话" :label-width="formLabelWidth">
          <el-input v-model="form.receivePhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.receiveAddress" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveReseive">确 定</el-button>
      </div>
    </el-dialog>
    <a-modal v-model="receiveVisible" title="收货地址管理" centered :width="800" @ok="defaultReceive">
      <a-radio-group :default-value="defaultValue" size="large">
        <a-radio-button :value="item.defaultStatus" v-for="item in receiveList" @click="selectAddress(item.id)">
          {{item.receiveName}}， {{item.receivePhone}}， {{item.receiveAddress}}
        </a-radio-button>
      </a-radio-group>
    </a-modal>
  </div>
</template>

<script>
import publicJs, {request} from "../../plugins/js/publicJs";
import moment from 'moment';

const orderColumns = [
  {
    title: '订单号',
    dataIndex: 'orderNumber',
  },
  {
    title: '产品标题',
    dataIndex: 'productTitle',
  },
  {
    title: '型号',
    dataIndex: 'modelName',
  },
  {
    title: '数量',
    dataIndex: 'orderCount',
  },
  {
    title: '订单价格',
    dataIndex: 'orderPrice',
  },
  {
    title: '下单时间',
    dataIndex: 'addTime',
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
  },
];

export default {
  data() {
    return {
      userId: '',
      userInfo: {},
      dialogVisible: false,
      orderVisible: false,
      teamVisible: false,
      commissionVisible: false,
      editReceive: false,
      receiveVisible: false,

      talentInfo: {
        userPhone: '',
      },

      tabListNoTitle: [
        {
          key: '0',
          tab: '虚拟产品',
        },
        {
          key: '1',
          tab: '实体产品',
        },
        {
          key: '2',
          tab: '预约产品',
        },
      ],
      noTitleKey: '0',
      netList: [],
      realList: [],
      apponinList: [],
      orderColumns,

      teamList: [],
      myCommission: '',
      moment,

      commissionLogList: [],
      cashoutList: [],
      commissionNoTitle: [
        {
          key: 'myCommission',
          tab: '我的佣金',
        },
        {
          key: 'cashoutLog',
          tab: '提款记录',
        },
      ],
      commissionTitleKey: 'myCommission',

      dialogFormVisible: false,
      addOrUpdate: 'add',
      form: {
        receiveName: '',
        receivePhone: '',
        receiveAddress: '',
      },
      defaultForm: {
        receiveName: '',
        receivePhone: '',
        receiveAddress: '',
      },
      formLabelWidth: '120px',

      defaultValue: "1",
      receiveList: [],
    };
  },
  created() {
    this.userId = localStorage.getItem("userToken");
    this.initUser();
  },
  methods:{
    initUser(){
      request({
        url:publicJs.urls.selectUserById + "?id=" +this.userId,
        method:'get',
      }).then(res => {
        this.userInfo = res.data;
        this.userInfo.userTitleBack = this.formatTitle(this.userInfo.userTitle);
      })
    },
    becomeTalent(){
      this.talentInfo.userPhone = '';
      this.dialogVisible = true;
    },
    saveTalent(){
      this.userInfo.userPhone = this.talentInfo.userPhone;
      this.userInfo.userTitle = '1';
      request({
        url:publicJs.urls.updateUser,
        method:'post',
        data: this.userInfo,
      }).then(res => {
        this.initUser();
        this.dialogVisible = false;
      })
    },
    lookOrder(){
      this.netList = [];
      this.realList = [];
      this.apponinList = [];
      request({
        url:publicJs.urls.selectUserOrder + "?userId=" +this.userId,
        method:'get',
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].productType === "0"){
            res.data[i].productTypeBack = "虚拟产品";
            this.netList.push(res.data[i]);
          }else if(res.data[i].productType === "1"){
            res.data[i].productTypeBack = "真实产品";
            this.realList.push(res.data[i]);
          }else {
            res.data[i].productTypeBack = "预约产品";
            this.apponinList.push(res.data[i]);
          }
        }
      })
      this.orderVisible = true;
    },
    lookTeam(){
      request({
        url:publicJs.urls.selectUserSons + "?fatherId=" +this.userId,
        method:'get',
      }).then(res => {
        var count = 0.0;
        var peopleNum = res.data.length;
        for (let i = 0; i < res.data.length; i++) {
          count += res.data[i].fatherSupport;
        }
        this.myCommission = "共获得--" + count + "元，团队人数--" + peopleNum + "人";
        this.teamList = res.data;
      })
      this.teamVisible = true;
    },
    lookCommission(){
      request({
        url:publicJs.urls.selectUserCommissionLog + "?getId=" +this.userId,
        method:'get',
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].description = "在" + res.data[i].addTime + "提供了" + res.data[i].getMoney + "元"
        }
        this.commissionLogList = res.data;
      })
      request({
        url:publicJs.urls.selectUserCashout + "?userId=" +this.userId,
        method:'get',
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].description = "在" + res.data[i].addTime + "提现了" + res.data[i].moneyNumber + "元"
        }
        this.cashoutList = res.data;
      })
      this.commissionVisible = true;
    },
    openReceive(){
      this.getReceive();
      this.editReceive = true;
    },
    insertOneReceive(){
      this.form = this.defaultForm;
      this.addOrUpdate = 'add';
      this.dialogFormVisible = true;
    },
    editOneReceive(item){
      this.form = item;
      this.addOrUpdate = 'update';
      this.dialogFormVisible = true;
    },
    saveReseive(){
      this.form.userId = this.userId;
      if (this.addOrUpdate === 'add'){
        request({
          url:publicJs.urls.insertReceive,
          method:'post',
          data: this.form,
        }).then(res => {
          this.getReceive();
          this.dialogFormVisible = false;
        })
      }else {
        request({
          url:publicJs.urls.updateReceive,
          method:'post',
          data: this.form,
        }).then(res => {
          this.getReceive();
          this.dialogFormVisible = false;
        })
      }
    },
    lookReceive(){
      this.getReceive();
      this.receiveVisible = true;
    },
    getReceive(){
      request({
        url:publicJs.urls.selectReceiveList + "?userId=" +this.userId,
        method:'get',
      }).then(res => {
        this.receiveList = res.data;
      })
    },
    selectAddress(id){
      for (let i = 0; i < this.receiveList.length; i++) {
        if (this.receiveList[i].id === id){
          this.receiveList[i].defaultStatus = "1";
        }else {
          this.receiveList[i].defaultStatus = "0";
        }
      }
    },
    defaultReceive(){
      request({
        url:publicJs.urls.updateDefaultReceive,
        method:'post',
        data: this.receiveList
      }).then(res => {
        this.$message.success("修改成功！！")
        this.receiveVisible = false;
      }).catch(err => {
        this.$message.error(res.data)
      })
    },
    loginOut(){
      localStorage.removeItem("userToken")
      localStorage.removeItem("roles")
      this.$router.push("/login")
    },
    onTabChange(key, type) {
      this[type] = key;
    },
    formatTitle(userTitle){
      if (userTitle === "0"){
        return "游客";
      }else if (userTitle === "1"){
        return "初级达人";
      }else if (userTitle === "2"){
        return "中级达人";
      }else if (userTitle === "3"){
        return "高级达人";
      }else {
        return "错误";
      }
    },
  }
};
</script>


<style scoped>

</style>
