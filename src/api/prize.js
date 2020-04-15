import request from '@/utils/request'

export function queryChartData() {
  return request({
    url: '/prize/allreportnums',
    method: 'get'
  })
}

export function getMyAllPrizes(data) {
  return request({
    url: '/report/getmyprizeidreport',
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
    url: '/prizechoose/updateonereport',
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
    url: '/report/getmymarkreport',
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

export function adminUpdatePrize(data) {
  return request({
    url: '/prizechoose/updateprizebyprize  ',
    method: 'post',
    data
  })
}

export function adminInsertPrize(data) {
  return request({
    url: '/prizechoose/add',
    method: 'post',
    data
  })
}

export function uploadReport(data) {
  return request({
    url: '/prizechoose/addreportrecord',
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

export function adminPrizes(data) {
  return request({
    url: '/prize/allnums',
    method: 'post',
    data
  })
}

export function adminDeletePrize(data) {
  return request({
    url: '/prizechoose/delprize',
    method: 'post',
    data
  })
}

export function submitEvaluateResult(data) {
  return request({
    url: '/mark/addmarkscore',
    method: 'post',
    data
  })
}

export function adminGetScore(data) {
  return request({
    url: '/report/getmarkresultsbyprizeidpage',
    method: 'post',
    data
  })
}

export function adminGetScoreNoPagenite(data) {
  return request({
    url: '/report/getmarkresultbyprizeid',
    method: 'post',
    data
  })
}

export function adminGetModifyReport(data) {
  return request({
    url: '/report/getallreportadmin',
    method: 'post',
    data
  })
}

export function adminGetReportById(data) {
  return request({
    url: '/report/getallreportadminbyprizeid',
    method: 'post',
    data
  })
}

export function adminUpdateReport(data) {
  return request({
    url: '/report/updateonereportbyadmin',
    method: 'post',
    data
  })
}

export function evaluateGetPrizeInfo() {
  return request({
    url: '/report/getmymarkreportprizeinfo',
    method: 'get'
  })
}

export function adminUpdateReportStatus(data) {
  return request({
    url: '/report/updateonereportword',
    method: 'post',
    data
  })
}

export function queryPrizeReportNum() {
  return request({
    url: '/prize/allnumdetail',
    method: 'get'
  })
}

export function adminUpdateMessage(data) {
  return request({
    url: '/report/updateonereportdesc',
    method: 'post',
    data
  })
}

export function adminGetPrizeOptions() {
  return request({
    url: '/prizechoose/getallprizechoose',
    method: 'get'
  })
}

export function adminPostPrize(data) {
  return request({
    url: '/prizechoose/add',
    method: 'post',
    data
  })
}

export function queryPrizeOptions(data) {
  return request({
    url: '/prizechoose/choosedetail',
    method: 'post',
    data
  })
}

export function queryOptionsByPrizeId(data) {
  return request({
    url: '/prizechoose/allnumsss',
    method: 'post',
    data
  })
}
