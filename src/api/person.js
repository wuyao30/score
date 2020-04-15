import request from '@/utils/request'

export function getReportersInfo(data) {
  return request({
    url: '/user/getreporterbycompany',
    method: 'post',
    data
  })
}

export function queryEvaluation(data) {
  return request({
    url: '/user/getmarkerbycompany',
    method: 'post',
    data
  })
}

export function queryAllReporter() {
  return request({
    url: '/user/getallreporter',
    method: 'get'
  })
}

export function submitReporter(data) {
  return request({
    url: '/user/addoneappler',
    method: 'post',
    data
  })
}

export function updateReportPassword(data) {
  return request({
    url: '/user/updateuserpassword',
    method: 'post',
    data
  })
}

export function deleteReporter(data) {
  return request({
    url: '/user/delone',
    method: 'post',
    data
  })
}

export function modifyUserStatus(data) {
  return request({
    url: '/user/updateuserenable',
    method: 'post',
    data
  })
}

export function queryAllEvaluation() {
  return request({
    url: '/user/getallmarker',
    method: 'get'
  })
}

export function insertEvaluation(data) {
  return request({
    url: '/user/addonemarker',
    method: 'post',
    data
  })
}

export function updateOnePerson(data) {
  return request({
    url: '/user/updateone',
    method: 'post',
    data
  })
}
