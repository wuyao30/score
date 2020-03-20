import request from '@/utils/request'

export function getAllPrize(data) {
  return request({
    url: '/api/allPrize',
    method: 'get',
    params: data
  })
}

export function getMyAllPrizes() {
  return request({
    url: '/api/mineAllPrize',
    method: 'get'
  })
}

export function getMainPrizeKind() {
  return request({
    url: '/api/main',
    method: 'get'
  })
}

export function getSpecificPrizeKind(data) {
  return request({
    url: '/api/spec',
    method: 'get',
    params: data
  })
}

export function updateReport(data) {
  return request({
    url: '/api/updateReport',
    method: 'post',
    data
  })
}
