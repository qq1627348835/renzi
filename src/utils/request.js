import axios from 'axios'

const service = axios.create({
  baseURL: '/ddd',
  timeout: 5000
})

export default service
