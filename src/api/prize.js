import request from '@/utils/request'

export function queryChartData() {
  return request({
    url: '/prize/allreportnums',
    method: 'get'
  })
}

export function getMyAllPrizes(data) {
  return request({
    url: '/report/getmyallreport',
    method: 'post',
    data
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
    url: '/prize/getprizename',
    method: 'get'
  })
}

export function updateReport(data) {
  return request({
    url: '/report/updateonereport',
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

export function deleteReport(data) {
  return request({
    url: '/report/delonereport',
    method: 'post',
    data
  })
}

export function uploadReport(data) {
  return request({
    url: '/report/addreportrecord',
    method: 'post',
    data
  })
}

export function queryReportDepartment() {
  return request({
    url: '/user/getcompanys',
    method: 'get'
  })
}
