import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    let role = 'renter'
    const domain = window.location.hostname.split('.')
    if (domain.length === 1) role = 'renter'
    if (domain.length === 2) {
      if (domain[0] === 'admin') role = 'admin'
      if (domain[0] === 'owner') role = 'owner'
    }
    if (token) {
      config.headers.Authorization = token
      config.headers.role = role
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default instance
