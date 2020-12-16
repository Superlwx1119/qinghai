import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
// const reqUrl = window.location.protocol + '//' + window.location.hostname + ':8083/gzhr/rs'
const reqUrl = ''
const service = axios.create({
  // baseURL: reqUrl, // url = base url + request url
  baseURL: process.env.NODE_ENV === 'production' ? reqUrl : process.env.VUE_APP_File_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // var enc = new TextDecoder('utf-8')
    // let res = {}
    // if (enc.decode(new Uint8Array(response.data)).length < 100) {
    //   res = JSON.parse(enc.decode(new Uint8Array(response.data))) // 转化成json对象
    // } else {
    //   res = response.data
    // }
    // if the custom code is not 20000, it is judged as an error.
    if (response.code === -1 && response) {
      Message({
        message: response.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(response.message || 'Error'))
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
