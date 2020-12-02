const collapsed = true;
const testGet = "/store/testGet"
const testPost = "/store/testPost"
const urls = {
  //StoreInfoCon
  selectAllNormal: '/store/selectAllNormal',
  selectAllStore: '/store/selectAllStore',
  insertStore: '/store/insertStore',
  updateStore: '/store/updateStore',
  deleteStore: '/store/deleteStore',
  loginStore: '/store/loginStore',
}

export default {
  collapsed,
  testGet,
  testPost,
  urls
}

//1.引入axios
import axios from 'axios'


//通过promise 封装

export function request(config){
  return new Promise((resolve, reject) => {
    //1.创建axios的实例
    const instance = axios.create({
      baseURL:'http://localhost:685',
      timeout:5000,
    })
    //2.发送真正的请求
    instance(config)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}
