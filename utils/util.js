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

const request = opt => {
  if (usingMock) {
    
  }
}

module.exports = {
  formatTime,
  request,
  debugConsole,
  log,
  error,
  info,
  warn
}
