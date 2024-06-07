import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import axios from 'axios';
import "./AccountHolders.css";

export default function AccountHolders() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST_URL}/api/auth/get-all-users`, { withCredentials: true });
                const data = response.data.users
                console.log(data)
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className='add-product-section'>
            <Sidebar />
            <div className='add-product-container'>
                <h1 className='page-header'>Account Holders</h1>
                <div>
                    {users.length === 0 ?
                        <p>Loading users...</p>
                        :

                        users.map(user => (
                            <div className='user-details'>
                                <div className='user-details-top'>
                                    <p><b>Name: </b>{user.name}</p>
                                    <p><b>Company Name: </b>{user.company_name}</p>
                                </div>
                                <div className='user-details-top'>
                                    <p><b>Phone: </b>{user.mobile}</p>
                                    <p><b>Email: </b>{user.email}</p>
                                    <p><b>_id: </b>{user._id}</p>
                                </div>
                            </div>
                        ))

                    }
                </div>
            </div>
        </div>
    );
}
