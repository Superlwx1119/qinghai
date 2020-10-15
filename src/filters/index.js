// import parseTime, formatTime and set to filter
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
// import { parseTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/* 左右结构，左边表格裁剪数据 */
export function filterColumns(columns, count) {
  return columns.filter((v, i) => {
    return i < count
  })
}

/**
 * @param val
 * @returns {T[] | BigUint64Array | Uint8ClampedArray | Uint32Array | Blob | Int16Array | T[] | Float64Array | SharedArrayBuffer | string | Uint16Array | ArrayBuffer | Int32Array | Float32Array | BigInt64Array | Uint8Array | Int8Array | T[]}
 */
export function filterIndexAndSelection(val) {
  return val.slice(2)
}

/**
 * 时间转换（moment）
 *
*/
export function momentDate(value, format) {
  if (!format) {
    format = 'DD MMM YYYY HH:mm'
  }
  if (value) {
    return moment(value).format(format)
  } else {
    return ''
  }
}

// 以下是针对系统管理的

// 过滤时间成天和时分秒
export function fliterTime(value) {
  return parseTime(value)
}
// 过滤时间成天和时分秒
export function parseTime(value) {
  let time
  if (!value) {
    time = '--'
  } else {
    time = moment(value).format('YYYY-MM-DD HH:mm:ss')
  }
  return time
}
// 过滤资源类型
export function fliterResuType(value) {
  switch (value) {
    case '1':
      return '菜单'
    case '2':
      return 'api'
    case '3':
      return '工作台组件'
    case '4':
      return '功能'
    case '5':
      return '基础功能'
  }
}
// 过滤变更类型
export function fliterchgType(value) {
  switch (value) {
    case '1':
      return '新增'
    case '2':
      return '删除'
    case '3':
      return '修改'
  }
}
// 过滤角色类型
export function fliterroleType(value) {
  switch (value) {
    case '2':
      return '业务角色'
    case '1':
      return '管理角色'
  }
}
// 过滤账号状态
export function fliterUactStatus(value) {
  switch (value) {
    case '2':
      return '已锁定'
    case '1':
      return '正常'
    case '3':
      return '已停用'
  }
}
// 过滤账号状态
export function fliterPwdChg(value) {
  switch (value) {
    case '2':
      return '重置'
    case '1':
      return '修改'
  }
}
// 过滤账号状态
export function fliterlginSuccFlag(value) {
  switch (value) {
    case '0':
      return '失败'
    case '1':
      return '成功'
  }
}
export default {
  // 过滤时间成天和时分秒
  fliterTime(value) {
    return parseTime(value)
  },
  parseTime(value) {
    let time
    if (!value) {
      time = '--'
    } else {
      time = moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
    return time
  },
  // 过滤资源类型
  fliterResuType(value) {
    switch (value) {
      case '1':
        return '菜单'
      case '2':
        return 'api'
      case '3':
        return '工作台组件'
      case '4':
        return '功能'
      case '5':
        return '基础功能'
    }
  },
  // 过滤变更类型
  fliterchgType(value) {
    switch (value) {
      case '1':
        return '新增'
      case '2':
        return '删除'
      case '3':
        return '修改'
    }
  },
  // 过滤角色类型
  fliterroleType(value) {
    switch (value) {
      case '2':
        return '业务角色'
      case '1':
        return '管理角色'
    }
  },
  // 过滤账号状态
  fliterUactStatus(value) {
    switch (value) {
      case '2':
        return '已锁定'
      case '1':
        return '正常'
      case '3':
        return '已停用'
    }
  },
  // 过滤账号状态
  fliterPwdChg(value) {
    switch (value) {
      case '2':
        return '重置'
      case '1':
        return '修改'
    }
  },
  // 过滤账号状态
  fliterlginSuccFlag(value) {
    switch (value) {
      case '0':
        return '失败'
      case '1':
        return '成功'
    }
  }
}
