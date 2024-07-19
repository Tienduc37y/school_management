import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api-school-mng-dev.vais.vn/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance
