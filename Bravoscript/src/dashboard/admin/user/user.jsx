import React, { useState, useEffect } from 'react';
import './user.css';

import { db, auth } from '../../../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import githubImg from '../../../assets/images/github.png';
import googleImg from '../../../assets/images/google.png';
import defaultUser from '../../../assets/images/user.jpg';

const User = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUserId(user.uid); // Save their UID
            } else {
                setCurrentUserId(null);
            }
        });

        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(usersList);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleUpdate = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';

        if (window.confirm(`Are you sure you want to change this ${currentRole} to ${newRole}?`)) {
            try {
                const userRef = doc(db, "users", userId);

                await updateDoc(userRef, {
                    role: newRole
                });

                setUsers(users.map(user =>
                    user.id === userId ? { ...user, role: newRole } : user
                ));

                alert(`${currentRole} change to ${newRole}`);
            } catch (error) {
                console.error("Error updating role:", error);
                alert("Failed to update role.");
            }
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to permanently delete this user?")) {
            try {
                await deleteDoc(doc(db, "users", userId));

                setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));

                alert("User deleted successfully.");
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Error deleting user.");
            }
        }
    };

    const getProviderIcon = (pictureUrl) => {
        if (!pictureUrl) return null;
        if (pictureUrl.includes('googleusercontent')) return googleImg;
        if (pictureUrl.includes('githubusercontent')) return githubImg;
        return defaultUser;
    };


    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const admins = users.filter(user => user.role === 'admin');
    const regularUsers = users.filter(user => user.role !== 'admin');

    if (loading) return <div style={{ padding: "20px" }}>Loading data...</div>;

    return (
        <div className="users-container">

            <div className="admin-container">
                <h1>Admin Panel</h1>
                <table className="admin-details">
                    <thead>
                        <tr>
                            <th>Identifier</th>
                            <th>Providers</th>
                            <th>Created</th>
                            <th>Admin ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin.id}>
                                <td>{admin.email}</td>
                                <td>
                                    {/* Detects provider based on the picture URL */}
                                    <img
                                        src={getProviderIcon(admin.picture)}
                                        alt="provider"
                                        style={{ width: '25px', height: '25px', objectFit: 'cover' }}
                                    />
                                </td>
                                <td>{formatDate(admin.createdAt)}</td>
                                <td>{admin.id}</td>
                                <td>
                                    {currentUserId === admin.id ? (
                                        <p>Online</p>
                                    ) : (
                                        <><button
                                            className='btn-update'
                                            onClick={() => handleRoleUpdate(admin.id, admin.role)}
                                        >
                                            {admin.role === 'admin' ? 'Demote' : 'Promote'}
                                        </button>
                                            <button
                                                className='btn-delete'
                                                onClick={() => handleDelete(admin.id)}
                                            >
                                                Delete
                                            </button></>
                                    )}



                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="user-container">
                <h1>Users</h1>
                <table className="user-details">
                    <thead>
                        <tr>
                            <th>Identifier</th>
                            <th>Providers</th>
                            <th>Created</th>
                            <th>User ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regularUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>
                                    <img
                                        src={getProviderIcon(user.picture)}
                                        alt="provider"
                                        style={{ width: '25px', height: '25px', objectFit: 'cover' }}
                                    />
                                </td>
                                <td>{formatDate(user.createdAt)}</td>
                                <td>{user.id}</td>
                                <td>
                                    <button
                                        className='btn-update'
                                        onClick={() => handleRoleUpdate(user.id, user.role)}
                                    >
                                        {user.role === 'admin' ? 'Demote' : 'Promote'}
                                    </button>

                                    <button
                                        className='btn-delete'
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {regularUsers.length === 0 && <tr><td colSpan="6" style={{ textAlign: "center" }}>No regular users found</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default User;