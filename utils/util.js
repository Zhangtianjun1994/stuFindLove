const app = getApp()
const debugging = true

const debugConsole = (type, ...args) => {
  if (!debugging) return
  let func = console[type]
  if (typeof func === 'function') {
    func.apply(null, args)
  }
}

const log = (...args) => {
  debugConsole('log', ...args)
}

const warn = (...args) => {
  debugConsole('warn', ...args)
}

const info = (...args) => {
  debugConsole('info', ...args)
}

const error = (...args) => {
  debugConsole('error', ...args)
}

const getImageInfo = (src) => {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src,
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const usingMock = false

const baseUrl = 'https://www.gxtdlm.cn'

const defaultLoadingOption = {
  title: '加载中',
  duration: 2000
}

const request = (opt, useLoading = true, loadingOption) => {
  if (usingMock) {
    
  } else {
    loadingOption = Object.assign({}, defaultLoadingOption, loadingOption)
    useLoading && wx.showLoading(loadingOption)
    return new Promise((resolve, reject) => {
      let success = res => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (res.data.code === 0) {
            resolve(res.data.data || res.data)
          } else {
            reject(res.data)
          }
        } else {
          reject(res)
        }
        useLoading && wx.hideLoading()
      }
      let fail = err => {
        reject(err)
        useLoading && wx.hideLoading()
      }
      let url = baseUrl + opt.url
      let header = {
        'content-type': 'application/json'
      }
      Object.assign(opt, {success, fail, url, header})
      wx.request(opt)
    })
  }
}

module.exports = {
  formatTime,
  request,
  debugConsole,
  log,
  error,
  info,
  warn,
  getImageInfo,
  baseUrl,
  request
}
