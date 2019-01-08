import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // request timeout application/x-www-form-data;charset=UTF-8
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  emulateJSON: false
})

// request interceptor
service.interceptors.request.use(config => {
  // console.log(config)
  // Do something before request is sent
  if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['Authorization'] = JSON.parse(getToken()).token
    config.method = 'post'
    /* JSON.stringify(config.params).substring(1,JSON.stringify(config.params).length-1)*/
    let vale = '';
    for (var p in config.params) {
      if (typeof config.params[p] !== 'object') {
        vale += ('&' + p + '=' + config.params[p])
      } else {
        vale += ('&' + p + '=' + JSON.stringify(config.params[p]))
      }
    }
    config.data = vale.substring(1, vale.length)
    // config.data = JSON.stringify(config.params).substring(1,JSON.stringify(config.params).length-1);
    config.params = '';
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  // response => response,
  /* /!**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   *!/*/
  response => {
    const res = response.data;
    if (res.imei_error_code !== 0) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.imei_error_code === 600) {
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        MessageBox.confirm(res.imei_error_msg, '确定登出', {
          confirmButtonText: '重新登录',
          showCancelButton: false,
          closeOnClickModal: false,
          showClose: false,
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        Message({
          message: res.imei_error_msg,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return response
    }
    return response
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
