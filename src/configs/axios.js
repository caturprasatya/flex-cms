import axios from 'axios'

const instance = axios.create({
  baseURL: 'https:/dev.service.flx.asia/api/v1'
})

export default instance
