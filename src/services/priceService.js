import axios from 'axios'
const baseUrl = '/products'

const getAll = () => {
  return axios.get(baseUrl)
}

const getAllFromSet = (setId) => {
  return axios.get(baseUrl + '/group/' + setId)
}

const getAllPricesFromUser = (userId) => {
  return axios.get('/users/' + userId)
}

const searchPrices = (searchTerm) => {
  return axios.get(baseUrl + '/search/' + searchTerm)
}

export default {
  getAll,
  getAllFromSet,
  getAllPricesFromUser,
  searchPrices
}
