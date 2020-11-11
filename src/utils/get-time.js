export function getCurrentTime() {
  var date = new Date()
  var month = date.getMonth() + 1

  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var hours = date.getHours()
  if (hours >= 0 && hours <= 9) {
    if (hours === 0) {
      hours = '00'
    } else {
      hours = '0' + hours
    }
  }
  var minutes = date.getMinutes()
  if (minutes >= 0 && minutes <= 9) {
    if (minutes === 0) {
      minutes = '00'
    } else {
      minutes = '0' + minutes
    }
  }
  var seconds = date.getSeconds()
  if (seconds >= 0 && seconds <= 9) {
    if (seconds === 0) {
      seconds = '00'
    } else {
      seconds = '0' + seconds
    }
  }

  var currentdate = date.getFullYear() + '.' + month + '.' + strDate + ' ' + hours + ':' + minutes + ':' + seconds

  console.log(currentdate)
  // 2017.07.11 15:14:44
  return currentdate
}
//  获取当日时间

const _date = new Date()
const year = _date.getFullYear() + ''
const month = (_date.getMonth() + 1) + ''
function format(v) {
  return v < 10 ? '0' + v : v
}
export function getFullYear() {
  return year
}
export function getToday() {
  return year + '-' + format(month) + '-' + format(_date.getDate())
}

// 时间戳转换格式必备1
export function timestampToTime(timestamp) {
  if ('timestamp'.length === 10) {
    var date = new Date(timestamp * 1000)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  } else {
    date = new Date(timestamp)
  }
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = date.getDate() + ' '
  const h = date.getHours() + ':'
  const m = date.getMinutes() + ':'
  const s = date.getSeconds()
  return Y + M + D + h + m + s
}
