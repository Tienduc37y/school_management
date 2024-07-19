import { toast } from 'vue3-toastify'

const typeToast = 'success' | 'error' | 'info'
export const toastInfo = ({ type = typeToast, time, mes, display = 'BOTTOM_RIGHT', ...rest }) => {
  toast[type](mes, {
    autoClose: time,
    position: toast.POSITION[display],
    ...rest
  })
}
export const arrayToObject = (arr) => {
  const obj = {}
  arr.forEach((item) => {
    const key = Object.keys(item)[0]
    obj[key] = item[key]
  })
  return obj
}