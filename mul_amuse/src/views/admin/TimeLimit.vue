<template>
  <div style="background:#ECECEC; padding:20px; height: 100%;">
    <a-row :gutter="[16,16]" style="height: 100%;">
      <a-col :span="8" style="height: 100%;">
        <a-card title="限时购大屏" style="height: 100%;">
          <a slot="extra" @click="saveBig">保存</a>
          <a-card hoverable style="width: 240px; margin-left: 25%;">
            <img
              slot="cover"
              alt="example"
              :src="productBig.productSpecialImg"
              style="width: 100%; height: 150px;"
            />
            <a-card-meta :title="productBig.storeName">
              <template slot="description">
                {{productBig.productTitle}}
              </template>
            </a-card-meta>
          </a-card>
          <a-card style="margin-top: 10px; height: 400px; overflow-y: scroll;">
            <a-list item-layout="horizontal" :data-source="bigList" style="height: 350px;">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta :description="item.productTitle">
                  <a slot="title">{{ item.storeName }}</a>
                </a-list-item-meta>
                <div>
                  <a-switch @change="bigChange(item)" :checked="item.checkFlag" />
                </div>
              </a-list-item>
            </a-list>
          </a-card>
        </a-card>
      </a-col>
      <a-col :span="16" style="height: 100%;">
        <a-card title="限时购" style="height: 100%;">
          <a slot="extra" @click="seeShow" style="margin-right: 30px">预览</a>
          <a slot="extra" @click="saveOne">保存</a>
          <a-row>
            <a-col :span="8" :offset="5">
              <a-card hoverable style="width: 240px;">
                <img
                  slot="cover"
                  alt="example"
                  :src="productOne[0].productSpecialImg"
                  style="width: 100%; height: 150px;"
                />
                <a-card-meta :title="productOne[0].storeName">
                  <template slot="description">
                    {{productOne[0].productTitle}}
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
            <a-col :span="8">
              <a-card hoverable style="width: 240px;">
                <img
                  slot="cover"
                  alt="example"
                  :src="productOne[1].productSpecialImg"
                  style="width: 100%; height: 150px;"
                />
                <a-card-meta :title="productOne[1].storeName">
                  <template slot="description">
                    {{productOne[1].productTitle}}
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
          <a-card style="margin-top: 10px; height: 400px; overflow-y: scroll;">
            <a-list item-layout="horizontal" :data-source="oneList" style="height: 350px;">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta :description="item.productTitle">
                  <a slot="title">{{ item.storeName }}</a>
                </a-list-item-meta>
                <div>
                  <a-switch @change="onChange(item)" :checked="item.checkFlag" />
                </div>
              </a-list-item>
            </a-list>
          </a-card>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import publicJs, {request} from "../../plugins/js/publicJs";
  import axios from "axios";

  export default {
    data() {
      return {
        productBig: {},
        productBigBack: [],
        bigList: [],

        productOne: [{productSpecialImg: ''}, {productSpecialImg: ''}],
        productOneBack: [],
        twoFree: [],
        oneList: [],
      };
    },
    created() {
      this.initBigList();
      this.initOneList();
    },
    methods:{
      initBigList(){
        request({
          url:publicJs.urls.selectIndexOneBig,
          method:'get',
        }).then(res => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].productSpecialImg = this.getImg(res.data[i].productSpecialImg);
            if (res.data[i].productSpecialStatus === '1'){
              res.data[i].checkFlag = true;
              this.productBig = res.data[i];
              this.productBigBack[0] = res.data[i];
            }else {
              res.data[i].checkFlag = false;
            }
          }
          this.bigList = res.data;
        })
      },
      initOneList(){
        request({
          url:publicJs.urls.selectIndexOne,
          method:'get',
        }).then(res => {
          var specialOne = [];
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].productSpecialImg = this.getImg(res.data[i].productSpecialImg);
            if (res.data[i].productSpecialStatus === '1'){
              res.data[i].checkFlag = true;
              specialOne.push(res.data[i]);
            }else {
              res.data[i].checkFlag = false;
            }
          }
          this.productOne = specialOne;
          this.oneList = res.data;
          this.productOneBack = res.data;
        })
      },
      bigChange(item) {
        for (let i = 0; i < this.bigList.length; i++) {
          if (this.bigList[i].checkFlag === true){
            this.bigList[i].checkFlag = false;
            this.bigList[i].productSpecialStatus = '0';
          }
        }
        item.checkFlag = true;
        item.productSpecialStatus = '1';
        this.productBig = item;
      },
      saveBig(){
        this.productBigBack[0].productSpecialStatus = '0';
        request({
          url:publicJs.urls.updateBig,
          method:'post',
          data: this.productBigBack[0]
        }).then(res => {
          request({
            url:publicJs.urls.updateBig,
            method:'post',
            data: this.productBig
          }).then(res => {
            this.$message.success("修改成功！！")
            this.initBigList();
          })
        })
      },
      onChange(item){
        if (item.checkFlag){
          item.checkFlag = false;
          item.productSpecialStatus = '0';
        }else {
          item.checkFlag = true;
          item.productSpecialStatus = '1';
        }
      },
      saveOne(){
        if (this.checkTwoFree()){
          request({
            url:publicJs.urls.updateOne,
            method:'post',
            data: this.oneList
          }).then(res => {
            this.$message.success("修改成功！！")
            this.initOneList();
          })
        }else {
          this.$message.error("请确保只有两个产品被选中！！")
        }
      },
      seeShow(){
        if (this.checkTwoFree()){
          this.productOne = this.twoFree;
        }else {
          this.$message.error("请确保只有两个产品被选中！！")
        }
      },
      checkTwoFree(){
        var flag = 0;
        var twoFree = [];
        for (let i = 0; i < this.oneList.length; i++) {
          if (this.oneList[i].checkFlag === true){
            flag++;
            twoFree.push(this.oneList[i]);
          }
        }
        if (flag === 2){
          this.twoFree = twoFree;
          return true;
        }else {
          return false;
        }
      },
      getImg(id){
        if (id){
          return axios.defaults.baseURL + publicJs.urls.selectFile + "?id=" + id;
        } else {
          return "";
        }
      },
    }
  };
</script>

<style scoped>

</style>
