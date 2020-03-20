import request from '@/utils/request'

export function getReportersInfo() {
  return request({
    url: '/reporter/info',
    method: 'get'
  })
}
