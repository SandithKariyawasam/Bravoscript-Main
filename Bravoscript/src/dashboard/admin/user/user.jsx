import React from 'react'
import './user.css'

import github from '../../../assets/images/github.png'
import google from '../../../assets/images/google.png'

const User = () => {
    return (
        <>
            <div className="users-container">
                <div className="admin-container">
                    <h1>Admin Panel</h1>
                    <table className="admin-details">
                        <tr>
                            <th>Identifier</th>
                            <th>Providers</th>
                            <th>Created</th>
                            <th>Signed In</th>
                            <th>User UID</th>
                            <th>Delete or Update</th>
                        </tr>
                        <tr>
                            <td>sandith001@gmail.com</td>
                            <td>
                                <img src={google} alt='' />
                            </td>
                            <td>Nov 30, 2025</td>
                            <td>Dec 5, 2025</td>
                            <td>V5x8hIzY16cVL3geUqtQTEEBqvG3</td>
                            <td>
                                <button className='btn-update'>Update</button>
                                <button className='btn-delete'>Delete</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="user-container">
                    <h1>User</h1>
                    <table className="user-details">
                        <tr>
                            <th>Identifier</th>
                            <th>Providers</th>
                            <th>Created</th>
                            <th>Signed In</th>
                            <th>User UID</th>
                            <th>Delete or Update</th>
                        </tr>
                        <tr>
                            <td>sandith001@gmail.com</td>
                            <td>
                                <img src={github} alt='' />
                            </td>
                            <td>Nov 30, 2025</td>
                            <td>Dec 5, 2025</td>
                            <td>V5x8hIzY16cVL3geUqtQTEEBqvG3</td>
                            <td>
                                <button className='btn-update'>Update</button>
                                <button className='btn-delete'>Delete</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}

export default User
