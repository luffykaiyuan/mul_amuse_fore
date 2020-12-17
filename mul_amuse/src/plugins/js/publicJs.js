const collapsed = true;
const urls = {
  //FileInfoCon
  fileUpload: '/file/fileUpload',
  createQRCode: '/file/createQRCode',
  selectFile: '/file/selectFile',
  //StoreInfoCon
  selectAllNormal: '/store/selectAllNormal',
  selectAllStore: '/store/selectAllStore',
  selectStoreByUsername: '/store/selectByUsername',
  selectStoreById: '/store/selectById',
  insertStore: '/store/insertStore',
  updateStore: '/store/updateStore',
  deleteStore: '/store/deleteStore',
  loginStore: '/store/loginStore',
  //StoreAddressCon
  insertAddress: '/address/insertAddress',
  selectAddressById: '/address/selectById',
  selectAllByStoreId: '/address/selectAllByStoreId',
  selectAllNormalStore: '/address/selectAllNormal',
  updateAddress: '/address/updateAddress',
  deleteAddress: '/address/deleteAddress',
  //ProductInfoCon
  selectProductByStore: '/product/selectProductByStore',
  selectIndexProductByStore: '/product/selectIndexProductByStore',
  selectSuperProductByStore: '/product/selectSuperProductByStore',
  selectProductById: '/product/selectProductById',
  selectIndexProduct: '/product/selectIndexProduct',
  selectSuperProduct: '/product/selectSuperProduct',
  insertProduct: '/product/insertProduct',
  updateProduct: '/product/updateProduct',
  deleteProduct: '/product/deleteProduct',
  //ModelInfoCon
  insertModel: '/model/insertModel',
  selectModelByProduct: '/model/selectModelByProduct',
  selectOneModel: '/model/selectOneModel',
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
  selectAllSet: '/supervipSet/selectAllSet',
  //SupervipMoreCon
  selectAllMore: '/supervipMore/selectAllMore',
  //OrderInfoCon
  insertOrder: '/order/insertOrder',
  selectAllNormalOrder: '/order/selectAllNormal',
  selectUserOrder: '/order/selectUserOrder',
  selectStoreOrder: '/order/selectStoreOrder',
  selectStoreNetOrder: '/order/selectStoreNetOrder',
  selectStoreRealOrder: '/order/selectStoreRealOrder',
  selectStoreAppointOrder: '/order/selectStoreAppointOrder',
  selectOrderByNum: '/order/selectOrderByNum',
  selectOrderDetail: '/order/selectOrderDetail',
  sendProduct: '/order/sendProduct',
  destoryCodeNumber: '/order/destoryCodeNumber',
  checkTime: '/order/checkTime',
  getProduct: '/order/getProduct',
  //UserInfoCon
  insertUser: '/user/insertUser',
  selectAllUser: '/user/selectAllUser',
  selectAllNormalUser: '/user/selectAllNormal',
  selectUserSons: '/user/selectUserSons',
  selectUerDetail: '/user/selectUerDetail',
  selectUerByUsername: '/user/selectUerByUsername',
  selectUserById: '/user/selectUserById',
  updateUser: '/user/updateUser',
  updateUserTitle: '/user/updateUserTitle',
  becomeTalent: '/user/becomeTalent',
  loginUser: '/user/loginUser',
  //CommissionLogCon
  selectUserCommissionLog: '/comLog/selectUserCommissionLog',
  //CashoutLogCon
  selectUserCashout: '/cashoutLog/selectUserCashout',
  insertCashoutLog: '/cashoutLog/insertCashoutLog',
  //ReceiveInfoCon
  insertReceive: '/receiveInfo/insertReceive',
  selectById: '/receiveInfo/selectById',
  selectUserReceive: '/receiveInfo/selectUserReceive',
  selectReceiveList: '/receiveInfo/selectReceiveList',
  updateReceive: '/receiveInfo/updateReceive',
  updateDefaultReceive: '/receiveInfo/updateDefaultReceive',
  //SupervipInfoCon
  insertSuperVIP: '/supervipInfo/insertSuperVIP',
  updateSuperVIP: '/supervipInfo/updateSuperVIP',
  selectByUserId: '/supervipInfo/selectByUserId',
  //SupervipInviteCon
  selectInvite: '/supervipInvite/selectInvite',
  insertSupervipInvite: '/supervipInvite/insertSupervipInvite',
  updateSupervipInvite: '/supervipInvite/updateSupervipInvite',
  becomeVip: '/supervipInvite/becomeVip',
}

export default {
  collapsed,
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
