import axios from 'axios'
import { parseCookies } from 'nookies'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.interceptors.request.use(
  function (config: any) {
    const cookies = parseCookies()

    if (!cookies.trilogia_token) return false

    config.headers.Authorization = `Bearer ${cookies.trilogia_token}`

    return config
  },
  function (error) {
    console.log(error)
    return Promise.reject(error)
  },
)
