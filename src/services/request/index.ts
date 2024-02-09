import { getToken } from '@/utils/token'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { BASE_URL, TIMEOUT } from './config'

//根据实际后台标准数据来定义
// export interface ResType {
//   errno: number
//   data?: ResDataType
//   msg?: string
// }

export type ResDataType = Record<string, unknown>

const CancelToken = axios.CancelToken
const pending = []

class Request {
  instance: AxiosInstance

  constructor(baseURL: string, timeout: number) {
    this.instance = axios.create({
      baseURL,
      timeout,
    })

    this.instance.interceptors.request.use(
      config => {
        // 在请求发送前做的操作
        const token = getToken()
        config.headers = config.headers ?? {} // 确保headers始终被定义
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        config.cancelToken = new CancelToken(c => {
          // executor 函数接收一个 cancel 函数作为参数
          pending.push(c)
        })
        return config
      },
      error => Promise.reject(error),
    )

    this.instance.interceptors.response.use(
      res => {
        const { status, statusText } = res
        if (status >= 400) {
          //根据需要改为其他可视化报错
          console.error(statusText ?? 'An unknown error occurred')
          return Promise.reject(new Error(statusText ?? 'An unknown error occurred'))
        }
        //如果后台json数据有标准格式可再细化返回res.data中的内容
        return res.data as ResDataType
      },
      err => Promise.reject(err),
    )
  }

  request<T = ResDataType>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request(config)
  }

  get<T = ResDataType>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.request({ ...config, url, method: 'GET' })
  }

  post<T = ResDataType>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.request({ ...config, url, data, method: 'POST' })
  }
}

export default new Request(BASE_URL, TIMEOUT)