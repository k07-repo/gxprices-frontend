import React, {useState, useEffect} from 'react'
import {LOCAL_STORAGE_ID} from '../utils/constants'
import userService from '../services/userService'
import Auth from '../utils/auth'
import {Button, Modal} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import PasswordChangeModal from './PasswordChangeModal'

const UserPage = () => {
    const [user, setUser] = useState(null)
    const [show, setShow] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_ID)
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            userService.setToken(user.token)
        }
    }, [])

    const history = useHistory()

    const handleLogout = () => {
        Auth.logout()
        setUser(null)
        history.push('/')
        window.location.reload()
    }
    

    const deletionModal = () => {
        const handleClose = () => setShow(false)

        return (
            <>  
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Are you sure you want to delete your account?
                        This cannot be undone!
                    </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={() => deleteUser()}>
                    Confirm
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel  
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )
    }

    
    const userPageHTML = () => {
        return (
            <div className="w-100 p-3">
                {deletionModal()}
                <PasswordChangeModal user={user} show={showPassword} handleClose={() => setShowPassword(false)}/>
                <div align="center">
                    <h1>My Account</h1><br/>

                    <table>
                        <tr>
                            <td>
                                Username:
                            </td>
                            <td>
                                {user.username}
                            </td>
                        </tr>
                        <tr>
                            <td align="center" colSpan="2">
                                <button onClick={() => setShowPassword(true)}>Change Password</button>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" colSpan="2">
                                <button onClick={() => setShow(true)}>Delete Account</button>
                            </td>
                        </tr>
                    </table>                    
                </div>
            </div>
        )
    }

    const deleteUser = async () => {
        if(user) {
            await userService.deleteUser(user.id)
        }
        handleLogout()
    }

    return (
        user ? userPageHTML() : <div className="w-100 p-3">You must log in to view this!</div>
    )

}

export default UserPage