import router from './router'
import NProgress from 'nprogress'
import { myVue } from './main'
import {
  getCurrentUser
} from '@/api/Common/Request'
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  getCurrentUser().then(res => {
    if (res.code === 0) {
      myVue.$setSessionStorage('hsa-portal-user', JSON.stringify(res.data))
    }
  })
  next()
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
