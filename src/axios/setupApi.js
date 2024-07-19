import store from '@/store'
import { toastInfo } from '../utils/function'
import axiosInstance from './api'
import router from '@/router'

export async function checkAccessToken() {
  const accessToken = getCookie('accessToken')
  const refreshToken = getCookie('refreshToken')

  if (accessToken) return true

  //Không có token
  if (!accessToken && !refreshToken) return false

  // accessToken và refreshToken còn hiệu lực
  if (accessToken && refreshToken) {
    setHeaderApi('Authorization', accessToken)
    return true
  }

  // accessToken hết hạn và refreshToken còn hiệu lực
  else if (refreshToken) {
    const isToken = await fetchToken()
    return isToken
  }
  return false
}

export async function fetchToken() {
  const refreshToken = getCookie('refreshToken')

  try {
    const response = await axiosInstance.post('/v2/auth/refresh-token', {
      refreshToken: refreshToken
    })

    if (!response.data) return false

    const { access, refresh } = response.data.data.tokens

    setHeaderApi('Authorization', access.token)
    setCookie('accessToken', access.token, access.expires)
    setCookie('refreshToken', refresh.token, refresh.expires)

    store.commit('SET_USER', response.data.data.user)
    return true
  } catch (error) {
    if (error.response.data.code === 'NotAuthen') {
      router.push({
        path: '/login',
        query: { url: window.location.pathname + window.location.search }
      })
      toastInfo({ type: 'error', mes: error.response.data.message })
    } else {
      toastInfo({ type: 'error', mes: error.message })
    }
    return false
  }
}
export function setHeaderApi(name, value) {
    axiosInstance.defaults.headers.common[name] = `Bearer ${value}`
}
export function setCookie(name, value, expirationTime, path = '/') {
    var expires = new Date(expirationTime)
    document.cookie =
      name + '=' + (value || '') + ';expires=' + expires.toUTCString() + '; path=' + path
}
  export function getCookie(name) {
    var nameEQ = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }