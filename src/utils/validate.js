import { object,string } from "yup"
export const loginSchema = object().shape({
    username: string()
      .email('Tên đăng nhập không tồn tại.')
      .required('Vui lòng nhập tên đăng nhập.'),
    password: string().min(6, ' Mật khẩu tối thiểu 8 kí tự.').required('Vui lòng nhập mật khẩu.')
  })