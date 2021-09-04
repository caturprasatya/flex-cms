import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://service.flx.asia/api/v1/'
})

export default instance
