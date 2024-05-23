import Sidebar from "../../Components/Sidebar/Sidebar";
import { AuthContext } from "../../ContextAPI/AuthContext";
import "./Dashboard.css";


import React, { useContext } from 'react'

export default function Dashboard() {
    const { loginValue } = useContext(AuthContext);
    const isoString = loginValue.last_login
    const date = new Date(isoString);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format
        timeZone: 'UTC' // Specify the time zone if needed
    };

    const formattedDate = date.toLocaleDateString('en-US', options);
    const formattedTime = date.toLocaleTimeString('en-US', options);
    return (
        <div className="dashboard-section">
            <Sidebar />
            <div className="dashboard-container">
                <div className="login-details-widget">
                    <h2>Welcome Admin!</h2>
                    <h1>{loginValue.name ? loginValue.name : loginValue.sanitizedAdminData.name}</h1>
                    <h3><span>Last Login:</span> {formattedDate} UTC </h3>
                </div>
            </div>
        </div>
    )
}
