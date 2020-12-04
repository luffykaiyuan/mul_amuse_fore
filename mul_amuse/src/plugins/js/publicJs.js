const collapsed = true;
const testGet = "/store/testGet"
const testPost = "/store/testPost"
const urls = {
  //FileInfoCon
  fileUpload: '/file/fileUpload',
  createQRCode: '/file/createQRCode',
  selectFile: '/file/selectFile',
  //StoreInfoCon
  selectAllNormal: '/store/selectAllNormal',
  selectAllStore: '/store/selectAllStore',
  insertStore: '/store/insertStore',
  updateStore: '/store/updateStore',
  deleteStore: '/store/deleteStore',
  loginStore: '/store/loginStore',
  //ProductInfoCon
  selectProductByStore: '/product/selectProductByStore',
  selectProductById: '/product/selectProductById',
  insertProduct: '/product/insertProduct',
  updateProduct: '/product/updateProduct',
  deleteProduct: '/product/deleteProduct',
  //ModelInfoCon
  insertModel: '/model/insertModel',
  selectModelByProduct: '/model/selectModelByProduct',
  updateModel: '/model/updateModel',
  deleteModel: '/model/deleteModel',
  //AdminInfoCon
  insertAdmin: '/admin/insertAdmin',
  selectAllAdmin: '/admin/selectAllAdmin',
  updateAdmin: '/admin/updateAdmin',
  changePassword: '/admin/changePassword',
  deleteAdmin: '/admin/deleteAdmin',
  loginAdmin: '/admin/loginAdmin',
  selectAdminByUsername: '/admin/selectByUsername',
  selectAdminById: '/admin/selectById',
  //SupervipSetCon
  selectSupervipSet: '/supervipSet/selectSupervipSet?id=259',
  updateSupervipSet: '/supervipSet/updateSupervipSet',
  //OrderInfoCon
  insertOrder: '/order/insertOrder',
  selectAllNormalOrder: '/order/selectAllNormal',
  selectUserOrder: '/order/selectUserOrder',
  selectStoreOrder: '/order/selectStoreOrder',
  selectOrderDetail: '/order/selectOrderDetail',
  sendProduct: '/order/sendProduct',
  destoryCodeNumber: '/order/destoryCodeNumber',
  getProduct: '/order/getProduct',
}

export default {
  collapsed,
  testGet,
  testPost,
  urls
}

//1.引入axios
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:685';
axios.defaults.timeout = 5000;

//通过promise 封装
export function request(config){
  return new Promise((resolve, reject) => {
    //2.发送真正的请求
    axios(config)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}
