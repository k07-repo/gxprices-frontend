import axios from 'axios'
const baseUrl = '/groups'

const getAll = () => {
  return axios.get(baseUrl)
}

export default {
  getAll
}
