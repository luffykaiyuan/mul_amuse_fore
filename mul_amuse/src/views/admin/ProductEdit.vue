<template>
  <v-card style="height: 100%">
    <v-card-title>
      <v-text-field v-model="productId" append-icon="mdi-magnify" label="产品ID" single-line hide-details
                    :autofocus="true" @click:append="searchDetail"></v-text-field>
    </v-card-title>
    <el-form ref="productForm" :model="productForm" label-width="80px" style="margin-top: 50px" v-if="getInfo">
      <el-row>
        <!--限时购首屏-->
        <el-col :span="8" v-if="productForm.productSpecial === '3' && productForm.productFree === '0'">
          <el-form-item label="特殊图片">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :show-file-list="false"
              :on-success="specialSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="productSpecialImg" :src="productSpecialImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <!--限时购-->
        <el-col :span="8" v-if="productForm.productSpecial === '4' && productForm.productFree === '0'">
          <el-form-item label="特殊图片">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :show-file-list="false"
              :on-success="specialSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="productSpecialImg" :src="productSpecialImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <!--品牌推荐-->
        <el-col :span="8" v-if="productForm.productSpecial === '5' && productForm.productFree === '0'">
          <el-form-item label="特殊图片">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :show-file-list="false"
              :on-success="specialSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="productSpecialImg" :src="productSpecialImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="productForm.productSpecial === '5' && productForm.productFree === '0'">
          <el-form-item label="特殊图片2">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :show-file-list="false"
              :on-success="specialSuccess2"
              :before-upload="beforeAvatarUpload">
              <img v-if="productSpecialImg2" :src="productSpecialImg2" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <!--会员模块-->
        <el-col :span="8" v-if="productForm.productSpecial !== '0' && productForm.productFree === '1'">
          <el-form-item label="特殊图片">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :show-file-list="false"
              :on-success="specialSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="productSpecialImg" :src="productSpecialImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分享图片">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :show-file-list="false"
              :on-success="shareSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="productShareImg" :src="productShareImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="封面图">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :show-file-list="false"
              :on-success="coverSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="productCoverImg" :src="productCoverImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主图一">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :show-file-list="false"
              :on-success="main1Success"
              :before-upload="beforeAvatarUpload">
              <img v-if="productMainImg1" :src="productMainImg1" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主图二">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :show-file-list="false"
              :on-success="main2Success"
              :before-upload="beforeAvatarUpload">
              <img v-if="productMainImg2" :src="productMainImg2" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主图三">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :show-file-list="false"
              :on-success="main3Success"
              :before-upload="beforeAvatarUpload">
              <img v-if="productMainImg3" :src="productMainImg3" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主图四">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :show-file-list="false"
              :on-success="main4Success"
              :before-upload="beforeAvatarUpload">
              <img v-if="productMainImg4" :src="productMainImg4" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主图五">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :show-file-list="false"
              :on-success="main5Success"
              :before-upload="beforeAvatarUpload">
              <img v-if="productMainImg5" :src="productMainImg5" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button style="float: right; margin-right: 30px; color: white;" type="primary" icon="el-icon-edit"
               v-if="getInfo" @click="openEdit">编辑详情</el-button>
    <el-dialog title="编辑详情" :visible.sync="dialogEdit" width="80%">
      <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="input"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="savaDetail">确 定</el-button>
      </span>
    </el-dialog>
  </v-card>
</template>

<script>
import publicJs, {request} from "../../plugins/js/publicJs";
import axios from "axios";

export default {
  data: () => ({
    collapsed: publicJs.collapsed,
    productId: '',
    input: '',
    getInfo: false,
    dialogEdit: false,
    imgUpload: '',
    productSpecialImg: '',
    productSpecialImg2: '',
    productCoverImg: '',
    productShareImg: '',
    productMainImg1: '',
    productMainImg2: '',
    productMainImg3: '',
    productMainImg4: '',
    productMainImg5: '',
    productForm: {}
  }),

  computed: {
  },

  watch: {
  },

  created () {
    this.imgUpload = axios.defaults.baseURL + publicJs.urls.fileUpload;
  },

  methods: {
    searchDetail (){
      if (this.productId){
        request({
          url:publicJs.urls.selectProductById + "?id=" + this.productId,
          method:'get',
        }).then(res => {
          // if (res.data.length){
          this.productForm = res.data;
          this.getInfo = true;
          this.productSpecialImg = this.getImg(res.data.productSpecialImg);
          this.productSpecialImg2 = this.getImg(res.data.productSpecialImg2);
          this.productCoverImg = this.getImg(res.data.productCoverImg);
          this.productShareImg = this.getImg(res.data.productShareImg);
          this.productMainImg1 = this.getImg(res.data.productMainImg1);
          this.productMainImg2 = this.getImg(res.data.productMainImg2);
          this.productMainImg3 = this.getImg(res.data.productMainImg3);
          this.productMainImg4 = this.getImg(res.data.productMainImg4);
          this.productMainImg5 = this.getImg(res.data.productMainImg5);
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

    updateProduct (){
      request({
        url:publicJs.urls.updateProduct,
        method:'post',
        data: this.productForm
      }).then(res => {
        this.$message.success("编辑成功！！")
      }).catch(err => {
        this.$message.error(res.data)
      })
    },

    specialSuccess(res, file) {
      this.productSpecialImg = URL.createObjectURL(file.raw);
      this.productForm.productSpecialImg = res;
      this.updateProduct();
    },
    specialSuccess2(res, file) {
      this.productSpecialImg2 = URL.createObjectURL(file.raw);
      this.productForm.productSpecialImg2 = res;
      this.updateProduct();
    },
    coverSuccess(res, file) {
      this.productCoverImg = URL.createObjectURL(file.raw);
      this.productForm.productCoverImg = res;
      this.updateProduct();
    },
    shareSuccess(res, file) {
      this.productShareImg = URL.createObjectURL(file.raw);
      this.productForm.productShareImg = res;
      this.updateProduct();
    },
    main1Success(res, file) {
      this.productMainImg1 = URL.createObjectURL(file.raw);
      this.productForm.productMainImg1 = res;
      this.updateProduct();
    },
    main2Success(res, file) {
      this.productMainImg2 = URL.createObjectURL(file.raw);
      this.productForm.productMainImg2 = res;
      this.updateProduct();
    },
    main3Success(res, file) {
      this.productMainImg3 = URL.createObjectURL(file.raw);
      this.productForm.productMainImg3 = res;
      this.updateProduct();
    },
    main4Success(res, file) {
      this.productMainImg4 = URL.createObjectURL(file.raw);
      this.productForm.productMainImg4 = res;
      this.updateProduct();
    },
    main5Success(res, file) {
      this.productMainImg5 = URL.createObjectURL(file.raw);
      this.productForm.productMainImg5 = res;
      this.updateProduct();
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return false;
      }

      if (isJPG) {
        return true;
      } else {
        if (isPNG) {
          return true;
        }
      }
      this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      return false;
    },
    openEdit(){
      this.dialogEdit = true;
      this.input = this.productForm.productDetail;
    },
    savaDetail(){
      this.productForm.productDetail = this.input;
      request({
        url:publicJs.urls.updateProduct,
        method:'post',
        data: this.productForm
      }).then(res => {
        this.$message.success("编辑成功！！")
        this.dialogEdit = false;
      }).catch(err => {
        this.$message.error(res.data)
      })
    },
    //图片获取路径拼接
    getImg(id){
      if (id){
        return axios.defaults.baseURL + publicJs.urls.selectFile + "?id=" + id;
      } else {
        return "";
      }
    },
  },
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-row {
  margin-bottom: 8px;
}
.el-col {
  border-radius: 4px;
}
</style>

