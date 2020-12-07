import axios from 'axios'
const baseUrl = '/users'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getUser = async (userId) => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.get(baseUrl + '/' + userId, config)
  return response
}

const registerUser = async (username, password) => {
  const newUser = {
    username: username,
    password: password
  }

  const response = await axios.post(baseUrl, newUser)
  console.log(response)
}

const deleteUser = async (userId) => {
  //Delete user requires authorization token
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.delete(baseUrl + '/' + userId, config)
  console.log(response)
}

const changeUsername = async (userId, newUsername) => {
  console.log(newUsername)
  
  //Delete user requires authorization token
  const config = {
    headers: {Authorization: token}
  }

  const body = {
    newUsername: newUsername
  }

  const response = await axios.put(baseUrl + '/' + userId + '/changeusername', body, config)
  console.log(response)
}

const changePassword = async (userId, newPassword) => {  
  //Change password requires authorization token
  const config = {
    headers: {Authorization: token}
  }

  const body = {
    newPassword: newPassword
  }

  const response = await axios.put(baseUrl + '/' + userId + '/changepassword', body, config)
  console.log(response)
}


export default {
  getUser,
  registerUser,
  deleteUser,
  changeUsername,
  changePassword,
  setToken
}
