/* eslint-disable @typescript-eslint/no-explicit-any */
import tools from '@/plugins/tools'
import { ElMessage } from 'element-plus'
import httpRequest, { httpStatus } from '@degon/http-request'

console.log(import.meta.env)
// axios 的实例及拦截器配置
httpRequest.setDefaults({
  baseURL: import.meta.env.VUE_APP_API as string | undefined,
  timeout: 10000
})

// 拦截 请求
httpRequest.setInterceptorsRequest(config => {
  const token = tools.getStore('admin_token') || 'jwt-token to be insert'
  config.headers!.Authorization = 'Bearer ' + token
  return config
}, err => {
  return Promise.reject(err)
})

// 拦截 响应
httpRequest.setInterceptorsResponse(
  res => {
    if (res.headers['content-disposition']) {
      // 下载文件
      tools.downloadFile(res)
      return Promise.resolve({})
    }
    if (res.status === 200) {
      // success 获取验证码接口略微不同
      const { data, data: { status, success, msg }, config: { url, customParams = { errAlert: false, successAlert: false } } } = res
      // 如果url后缀是.json，那么就直接返回结果
      if (url?.endsWith('.json')) {
        return Promise.resolve(data)
      }
      // 处理后端返回的错误
      if (status === 1 || success) {
        customParams.successAlert && ElMessage.success(msg || '成功')
        return Promise.resolve(data)
      }
      customParams.errAlert && ElMessage.error(msg || '发生错误')
      return Promise.reject(data)
    } else {
      return Promise.reject(res.data)
    }
  },
  err => {
    const { code, message, config: { customParams = { errAlert: false, successAlert: false } } } = err
    if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) { //  判断请求超时
      const msg = '请求超时,请刷新重新加载',
        error = {
          status: 0,
          data: '',
          msg: msg
        }
      customParams.errAlert && ElMessage.error(msg)
      return Promise.reject(error)
    }
    if (err && err.request) {
      const status: number = err.request.status
      err.msg = httpStatus[status] || '网络发生错误'
      switch (status) {
        case 401:
          console.log('没有权限，请检查token是否合法')
          tools.removeStore('admin-token').then(() => {
            location.reload()
          })
          break
        default:
      }
    }
    customParams.errAlert && ElMessage.error(err.msg)
    return Promise.reject(err)
  }
)

export default httpRequest
