import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/token',
    method: 'post',
    data
  })
}

export function getInfo(Authorization) {
  return request({
    url: '/user/getonedetail',
    method: 'get',
    params: { Authorization }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
