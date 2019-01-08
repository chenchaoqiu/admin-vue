import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function loginByUsername(mobile, password) {
  const data = {
    mobile,
    password
  }
  return request({
    url: '/api/pcadmin/common/login',
    method: 'post',
    params: data

  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return new Promise((resolve, reject) => {
    resolve({ data: getToken() })
  })
  /* return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })*/
}

