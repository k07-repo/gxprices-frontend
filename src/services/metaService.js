import axios from 'axios'
const baseUrl = '/meta'

const getLastUpdated = () => {
  return axios.get(baseUrl)
}

export default {
  getLastUpdated
}
