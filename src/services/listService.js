import axios from 'axios'
const baseUrl = '/lists'


let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const pushToWatchlist = async(userId, productId) => {
    const config = {
        headers: {Authorization: token}
    }

    const response = await axios.put(baseUrl + '/' + userId + '/watchlist/' + productId, null, config)
    return response.data
}

const pushToCollection = async(userId, productId) => {
    const config = {
        headers: {Authorization: token}
    }

    const response = await axios.put(baseUrl + '/' + userId + '/collection/' + productId, null, config)
    return response
}

const deleteFromWatchlist = async(userId, productId) => {
    const config = {
       headers: {Authorization: token}
    }
    
    const response = await axios.put(baseUrl + '/' + userId + '/watchlist/delete/' + productId, productId, config)
    return response
}

const deleteFromCollection = async (userId, productId) => {
    const config = {
       headers: {Authorization: token}
    }

    const response = await axios.put(baseUrl + '/' + userId + '/collection/delete/' + productId, productId, config)
    return response
}

const increment = async (userId, productId) => {
    const config = {
       headers: {Authorization: token}
    }
 
    const response = await axios.put(baseUrl + '/' + userId + '/collection/increment/' + productId, productId, config)
    return response.data
}


const decrement = async (userId, productId) => {
    const config = {
       headers: {Authorization: token}
    }
    
    const response = await axios.put(baseUrl + '/' + userId + '/collection/decrement/' + productId, productId, config)
    return response.data
}


export default {
    setToken,
    pushToWatchlist,
    pushToCollection,
    deleteFromWatchlist,
    deleteFromCollection,
    increment,
    decrement
}