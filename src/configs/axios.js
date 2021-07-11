import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://server-flex.herokuapp.com/api/v1'
})

export default instance
