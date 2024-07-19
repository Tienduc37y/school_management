import { ref } from 'vue'
import router from '@/router'
import store from '@/store'
import { toastInfo } from '../utils/function'
import { checkAccessToken, getCookie, setHeaderApi } from './setupApi'
import axiosInstance from './api'

export default function useTransition() {
  const error = ref(null)

  async function callApi(endpoint, method = 'GET', data = null, params) {
    if (!(await checkAccessToken())) {
      return router.push('/login')
    }

    try {
      const config = {
        method: method,
        url: endpoint,
        data: data,
        params: params
      }

      const accessToken = getCookie('accessToken')
      setHeaderApi('Authorization', accessToken)

      const response = await axiosInstance(config)

      store.commit('SET_MES_API_ERROR', [])

      return response.data
    } catch (err) {
      console.log('err', err);
      if (err.response && err.response.data) {
        if (err.response.data.code === 'NotAuthen') {
          toastInfo({ type: 'error', mes: err.response.data.message })

          return router.push('/login')
        } else if (err.response.data.error) {
          error.value = err.response.data.error.issues.map((issue) => ({
            [issue.path[0]]: issue.message
          }))
          store.commit('SET_MES_API_ERROR', error.value)
        } else {
          toastInfo({ type: 'error', mes: err.response.data.message })
        }
        return false
      }
      toastInfo({ type: 'error', mes: err.message })
      return false
    }
  }

  return { callApi, error }
}
