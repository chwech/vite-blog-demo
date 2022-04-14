/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

const tools = {
  /**
   * 实现类似 laravel Arr类中的数组操作，因为js中对象操作更方便，所以改为对象操作，另外，json序列化时数组非数字key会丢失
   * @example set({},'a.b.c','ddd') => {a:b:{c:'ddd'}}
   * @param {Object} array 被操作对象
   * @param {String} key key值
   * @param {Object} value 设置后返回值（因为js无法实现函数的传值引用，所以只能返回值再从函数外重新设置）
   */
  set (array: any, key: string, value: any): any {
    let arr = array // 实现传值引用(指针指向同一地址)
    const keys = key.split('.')

    while (keys.length > 1) {
      key = keys.shift() || ''
      if (!Object.prototype.hasOwnProperty.call(arr, key) || !(arr[key] instanceof Object)) {
        arr[key] = {}
      }
      arr = arr[key] // php 请使用 $array = &$array[$key] （arr指针指向了array的子对象）
    }
    arr[keys.shift() || ''] = value

    return array
  },
  /**
   * 实现类似 laravel Arr类中的数组操作，与set方法对应
   * @example get({a:{b:{c:{d:123}}}},'a.b.c.d') => 123
   * @param {Object} $array 被操作对象
   * @param {String} $key key值
   * @param {Object} $default 设置后返回值（因为js无法实现函数的传值引用，所以只能返回值再从函数外重新设置）
   */
  get ($array: { [x: string]: any }, $key: string | null, $default = null): any {
    if ($key === null) {
      return $array
    }
    if (Object.prototype.hasOwnProperty.call($array, $key)) {
      return $array[$key]
    }
    $key.split('.').forEach(($segment: string) => {
      if (Object.prototype.hasOwnProperty.call($array, $segment)) {
        $array = $array[$segment]
      } else {
        return $default
      }
    })
    return $array
  },
  /**
   * 存储localStorage
   * @param { string } name 缓存的键名，支持"wechat.user.name"格式来获取值，前提是缓存值是一个JSON字符串
   * @param { string } content 缓存的内容
   * @param { number } time 缓存时间 单位：ms;
   */
  setStore: function (name: string, content: any, time: any): any {
    if (arguments.length <= 1) return
    if (time && time.toString().length !== 13) throw new Error('过期时间只支持毫秒数')
    if (!name) return
    name = name.toString()
    const keys = name.split('.'),
      key = keys.shift(),
      str = window.localStorage.getItem(key || '') || '' // 这里有一个坑爹的bug，JSON.parse(null)是不会报错的

    interface Value {
      data: any;
      _endtime: number;
    }
    let value: Value | string = {
      data: str,
      _endtime: 0
    }
    try {
      value = JSON.parse(str)
    } catch {}
    const realKey = keys.join('.')
    if (typeof value !== 'string') {
      if (keys.length === 0) {
        value.data = content
      } else {
        value.data = this.set(value.data, realKey, content) // 有问题
      }
      if (time !== -1) value._endtime = time
    }
    value = JSON.stringify(value)
    window.localStorage.setItem(key || '', value)
    return this.getStore(name)
  },
  /**
   *  @param string name 缓存的键名，支持"wechat.user.name"格式来获取值，前提是缓存值是一个JSON字符串
   */
  getStore: function (name: string): any {
    const timestamp = Date.parse((new Date()).toString())
    if (!name) return
    const key = name.split('.')[0]
    let str = ''
    str = window.localStorage.getItem(key) || ''
    try {
      let val = JSON.parse(str)
      if (val._endtime && timestamp > val._endtime) return
      if (!Object.prototype.hasOwnProperty.call(val, 'data')) return
      val = val.data
      name.split('.').forEach((segment, index) => {
        if (index > 0) {
          if (Object.prototype.hasOwnProperty.call(val, segment)) {
            val = val[segment]
          } else {
            val = false
          }
        }
      })
      return val
    } catch (e) {
      return false
    }
  },

  /**
   * 删除键值
   * @param name 键名
   */
  removeStore: async function (name: string): Promise<any> {
    const result = await this.setStore(name, null, Date.now() - 1000)
    return result
  },

  /**
   * 下载文件
   * @param {object} res 请求返回response对象
   */
  downloadFile (res: any): any {
    function getFilename (contentDisposition: string) {
      /filename\*=utf-8''(.*);?/gi.exec(contentDisposition)
      let filename = decodeURIComponent(RegExp.$1)
      if (!filename) {
        /filename=(.*);?/gi.exec(contentDisposition)
        filename = decodeURIComponent(RegExp.$1)
      }
      return filename
    }

    const newBlob = new Blob([res.data], { type: res.headers['content-type'] }),
      filename = getFilename(res.headers['content-disposition']),
      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      //   window.navigator.msSaveOrOpenBlob(newBlob, filename)
      //   return
      // }

      // download
      objectURL = window.URL.createObjectURL(newBlob),
      downloadLink = window.document.createElement('a')
    downloadLink.href = objectURL
    downloadLink.download = filename
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

    setTimeout(function () {
    // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(objectURL)
    }, 60)
  }
}

export default tools
