import $axios from '@/api/http'

const baseURL = import.meta.env.VUE_APP_API_BASE

export const demoRequest = (params: object): Promise<{data: string}> => $axios.get('prescription_drug', { params }, { customParams: { errAlert: true, successAlert: true } }) // 请求demo

export const area = (params: object) => $axios.get('area', { params }, { baseURL })// 地区

export const login = (data: any) => $axios.post('auth/login', { data })


export const getArticles = (params: object) => $axios.get('article', { params })