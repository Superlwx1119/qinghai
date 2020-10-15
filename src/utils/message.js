import { MessageBox, Message } from 'element-ui'

/**
 * @author 封装 element-ui 确认框弹框
 * @param text
 * @param type
 * @returns {Promise}
 */
export function handleConfirm(text = '确定执行此操作吗？', type = 'warning') {
  return MessageBox.confirm(`<div class="myalert-header">操作提醒</div><div class="myalert-content">${text}</div></div>`, {
    confirmButtonText: '确定',
    dangerouslyUseHTMLString: true,
    cancelButtonText: '取消',
    type: type
  })
}

/**
 * @author 封装 element-ui 成功消息提示
 * @param text
 * @param type
 * @returns {Promise}
 */
export function msgSuccess(msg = '操作成功', type = 'success') {
  return Message({
    type: 'success',
    dangerouslyUseHTMLString: true,
    message: `<strong>操作成功</strong><p>${msg}</p>`,
    duration: 1000
  })
}
/**
 * @author 封装 element-ui 告警消息提示
 * @param text
 * @param type
 * @returns {Promise}
 */
export function msgWarning(msg = '操作成功', type = 'warning') {
  return Message({
    type: type,
    dangerouslyUseHTMLString: true,
    message: `<strong>操作成功</strong><p>${msg}</p>`,
    duration: 1000
  })
}
/**
 * @author 封装 element-ui 失败消息提示
 * @param text
 * @param type
 * @returns {Promise}
 */
export function msgError(msg = '操作失败', type = 'error') {
  return MessageBox.alert(`<div class="myalert-header">操作失败</div>
    <div class="myalert-content">${msg}</div>`, {
    dangerouslyUseHTMLString: true, confirmButtonText: '确定',
    type: type
  })
}
/**
 * @author 封装 获取sessionStorage
 * @param text
 * @param type
 * @returns {Promise}
 */
export function getSessionstorage(params) {
  return window.sessionStorage.getItem(params)
}
/**
 * @author 封装 设置sessionStorage
 * @param text
 * @param type
 * @returns {Promise}
 */
export function setSessionstorage(key, value) {
  return window.sessionStorage.setItem(key, value)
}
