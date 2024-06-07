import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import axios from 'axios';
import * as XLSX from 'xlsx';
import "./AccountHolders.css";

export default function AccountHolders() {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST_URL}/api/auth/get-all-users`, { withCredentials: true });
                const data = response.data.users;
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(users.map(user => ({
            Name: user.name,
            "Company Name": user.company_name,
            Phone: user.mobile,
            Email: user.email
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(workbook, "valence-account-holders.xlsx");
    };

    return (
        <div className='add-product-section'>
            <Sidebar />
            <div className='add-product-container'>
                <h1 className='page-header'>Account Holders</h1>
                <button onClick={exportToExcel} className="download-button">Download Users Data</button>
                <div>
                    {users.length === 0 ? (
                        <p>Loading users...</p>
                    ) : (
                        <table className='users-table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Company Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.company_name}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
