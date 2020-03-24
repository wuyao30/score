import request from '@/utils/request'

export function getAllPrize(data) {
  return request({
    url: '/api/allPrize',
    method: 'get',
    params: data
  })
}

export function queryChartData() {
  return request({
    url: '/prize/chart',
    method: 'get'
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

export function getSpecificPrizeKind() {
  return request({
    url: '/api/spec',
    method: 'get'
  })
}

export function updateReport(data) {
  return request({
    url: '/api/updateReport',
    method: 'post',
    data
  })
}

export function prizesDetail() {
  return request({
    url: '/api/prizesDetail',
    method: 'get'
  })
}

export function queryAllPrizes() {
  return request({
    url: '/prize/info',
    method: 'get'
  })
}

export function queryEvaluationPrizeInfo() {
  return request({
    url: '/evaluation/prize',
    method: 'get'
  })
}

export function getAllPrizeNames() {
  return request({
    url: '/prize/all',
    method: 'get'
  })
}
