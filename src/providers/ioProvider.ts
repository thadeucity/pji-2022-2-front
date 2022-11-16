import axios from "axios"

export const createIoInstance = (baseUrl: string, withCredentials: boolean = true) => {
  const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: withCredentials,
  })

  const safeAsync = async (fn: Function) => {
    return fn().then((res: any) => [res, null]).catch((err: any) => [null, err])
  }

  return {
    get: <T> (url: string, params?: Record<string, unknown>, config = {}) => 
      safeAsync(() => instance.get<T>(url, { params, ...config })),
    post: <T> (url: string, data?: Record<string, unknown>, config = {}) =>
      safeAsync(() => instance.post<T>(url, data, config)),
    put: <T> (url: string, data?: Record<string, unknown>, config = {}) =>
      safeAsync(() => instance.put<T>(url, data, config)),
  }
}