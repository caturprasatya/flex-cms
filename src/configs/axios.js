import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://hackcomm-e-commerce-cms.herokuapp.com'
})

export default instance
