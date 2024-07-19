import axiosInstance from '@/axios/api'

import { setCookie } from '@/axios/setupApi'
import { toastInfo } from '@/utils/function'

export const loginUser = async ({ commit }, formLogin) => {
    try {
      const res = await axiosInstance.post('v2/auth/login', formLogin)
  
      if (res.data.data.tokens) {
        const { access, refresh } = res.data.data.tokens
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access.token}`
  
        setCookie('accessToken', access.token, access.expires)
        setCookie('refreshToken', refresh.token, refresh.expires)
        commit('SET_USER', res.data.data.user)
      }
    } catch (err) {
      if (err.response.data.code === 'NotAuthen') {
        commit('SET_MES_API_ERROR', err.response.data.message)
        toastInfo({ type: 'error',time:2000, mes: err.response.data.message,display:'TOP_CENTER'})
        return false
      }
    }
  }