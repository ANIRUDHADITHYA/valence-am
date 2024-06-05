import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar/Sidebar';
import "./Orders.css";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        // Fetch orders from the backend
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST_URL}/api/orders/get-all-orders`, { withCredentials: true }); // Adjust the URL as necessary
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    const handleSearch = () => {
        console.log(orders)
    };

    return (
        <div className='order-section'>
            <Sidebar />

            <div className='order-wraper'>
                <div className='filter-sort'>
                    <div>
                        <input
                            placeholder='Order ID'
                            name='order-id'
                            type='text'
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <div className='order-sort'>
                        <p>Sort Date <span><i className="fa-solid fa-arrow-up-wide-short"></i></span></p>
                    </div>
                    <div className='order-filter'>
                        <label htmlFor="dropdown">Order Filter</label>
                        <select id="dropdown">
                            <option value="" disabled>Select an option</option>
                            <option value="Open">Open</option>
                            <option value="In Enquiry">In Enquiry</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {orders.map(order => (
                    <div key={order.order_id} className='order-container'>
                        <div className='order-content header'>
                            <p className='order-id'><b>Order ID:</b> <span>{order.order_id}</span></p>
                            <p className='date-time'><b>Date/Time:</b> <span>{new Date(order.timestamp).toLocaleString()}</span></p>
                            <p className={`order-status ${order.order_status.toLowerCase().replace(" ", "-")}`}><b>Order Status:</b> <span>{order.order_status}</span></p>
                        </div>
                        <div className='order-content'>
                            <p><b>Ordered By: </b>{order.user.name}</p>
                            <p><b>Mobile: </b>{order.user.mobile}</p>
                            <p><b>Email: </b>{order.user.email}</p>
                            <a href={`/orders/${order._id}`}><span>View Details</span></a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
