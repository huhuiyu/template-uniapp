const BASE_URL = 'https://api.huhuiyu.top'
const TOKEN_KEY = BASE_URL + '_local_token_key'

const localTokenInfo = {
  save: (data) => {
    if (data && data.token) {
      uni.setStorageSync(TOKEN_KEY, data.token)
    }
  },
  load: () => {
    let token = uni.getStorageSync(TOKEN_KEY)
    return token ? token : ""
  },
  remove: () => {
    uni.removeStorageSync(TOKEN_KEY)
  }
}

const api = {
  ajax: (url, param, cb, method) => {
    uni.request({
      url: BASE_URL + url,
      method: method,
      data: param,
      header: {
        'Authorization': localTokenInfo.load(),
        'content-type': 'application/json'
      },
      success: (resp) => {
        localTokenInfo.save(resp.data)
        cb(resp.data)
      },
      fail: (error) => {
        console.log('请求发生错误：', error)
        cb({
          code: 500,
          success: false,
          message: '网站忙，请稍后重试'
        })
      }
    })
  },
  get: (url, param, cb) => {
    api.ajax(url, param, cb, "GET")
  },
  post: (url, param, cb) => {
    api.ajax(url, param, cb, "POST")
  },
  put: (url, param, cb) => {
    api.ajax(url, param, cb, "PUT")
  },
  delete: (url, param, cb) => {
    api.ajax(url, param, cb, "DELETE")
  },
  patch: (url, param, cb) => {
    api.ajax(url, param, cb, "PATCH")
  }
}

const tools = {
  concatJson: (...jsons) => {
    let json = {}
    for (let index = 0; index < jsons.length; index++) {
      let element = jsons[index]
      for (let key in element) {
        json[key] = element[key]
      }
    }
    return json
  },
  formatDate: (value, format = 'yyyy-MM-dd hh:mm:ss') => {
    try {
      let time = new Date()
      if (typeof value === 'number') {
        time.setTime(parseInt(value.toString()))
      } else if (value instanceof Date) {
        time = value
      }
      let year = time.getFullYear() + ''
      let month = time.getMonth() + 1 + ''
      let day = time.getDate() + ''
      let hour = time.getHours() + ''
      let minute = time.getMinutes() + ''
      let second = time.getSeconds() + ''
      let ms = time.getMilliseconds() + ''
      month = month.padStart(2, '0')
      day = day.padStart(2, '0')
      hour = hour.padStart(2, '0')
      minute = minute.padStart(2, '0')
      second = second.padStart(2, '0')
      ms = ms.padStart(3, '0')

      format = format.replace(/yyyy/g, year)
      format = format.replace(/MM/g, month)
      format = format.replace(/dd/g, day)
      format = format.replace(/hh/g, hour)
      format = format.replace(/mm/g, minute)
      format = format.replace(/ss/g, second)
      format = format.replace(/ms/g, ms)
      return format
    } catch (ex) {
      console.error(ex)
      return ''
    }
  },
  formatFileSize: (filesize) => {
    console.log('in filesize====>', filesize)
    if (filesize === 0) {
      return '0 B'
    }
    let k = 1024
    //单位值
    let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let i = Math.floor(Math.log(filesize) / Math.log(k))
    //.toPrecision(3)
    return (filesize / Math.pow(k, i)).toFixed(1) + '' + sizes[i]
  }
}

export default api

export {
  api as api,
  tools as tools
}