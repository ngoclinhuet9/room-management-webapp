import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    let role = 'renter'
    const path = window.location.pathname
    if (path.startsWith("/admin")) role = 'admin'
    if (path.startsWith("/owner")) role = 'owner'
    if (token) {
      config.headers.Authorization = token
      config.headers.role = role
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default instance
