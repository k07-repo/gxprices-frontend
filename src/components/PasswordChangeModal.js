import React, {useState} from 'react'
import userService from '../services/userService'
import Auth from '../utils/auth'
import {Button, Modal} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

const PasswordChangeModal = ({ user, show, handleClose }) => {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const [validationMessage, setValidationMessage] = useState("")

    const history = useHistory()

    const handlePasswordChange = async () => {
        
        if(newPassword !== confirmPassword) {
            setValidationMessage('Password and confirm password are different!')
            return
        } else if(newPassword.length === 0) {
            setValidationMessage('Password required!')
            return
        }

        userService.setToken(user.token)
        await userService.changePassword(user.id, newPassword)
        Auth.logout()
        history.push('/')
        window.location.reload()        
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div align="center">
                        <form>
                            <tr>
                                <td colSpan="2">
                                    If successful, this will log you out.
                                </td>
                            </tr>
                            <tr>
                                <td align="right">
                                    New Password
                                </td>
                                <td>
                                    <input type="password" value={newPassword} onChange={({ target }) => setNewPassword(target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td align="right">
                                    Confirm Password
                                </td>
                                <td>
                                    <input type="password" value={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    {validationMessage}
                                </td>
                            </tr>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handlePasswordChange}>
                        Change Password
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PasswordChangeModal