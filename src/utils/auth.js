import { LOCAL_STORAGE_ID } from './constants'

const getLoggedInUser = () => {
    const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_ID)
    if(loggedUserJSON) {
       const user = JSON.parse(loggedUserJSON)
       return user       
    } else {
       return null
    }
}

const logout = () => {
    window.localStorage.clear()
}
   

export default {
    getLoggedInUser,
    logout
}