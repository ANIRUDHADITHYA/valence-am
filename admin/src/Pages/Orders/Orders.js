import React, { useContext, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import "./Orders.css";
import { OrderContext } from '../../ContextAPI/OrderContext';

export default function Orders() {
    const { orders, loading, error } = useContext(OrderContext);
    const [orderId, setOrderId] = useState('');
    const [sortDate, setSortDate] = useState(false);
    const [filterStatus, setFilterStatus] = useState('');

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error fetching orders: {error}</p>;


    const sortedOrders = [...orders].sort((a, b) => {
        if (sortDate) {
            return new Date(a.timestamp) - new Date(b.timestamp);
        } else {
            return new Date(b.timestamp) - new Date(a.timestamp);
        }
    });


    const filteredOrders = sortedOrders.filter(order => {
        if (filterStatus) {
            return order.order_status === filterStatus;
        }
        return true;
    });


    const searchedOrders = filteredOrders.filter(order => {
        if (orderId) {
            const user = order.user;
            const searchTerm = orderId.toLowerCase();
            return order.order_id.toString().includes(searchTerm) ||
                user?.name.toLowerCase().includes(searchTerm) ||
                user?.email.toLowerCase().includes(searchTerm) ||
                user?.mobile.toString().includes(searchTerm);
        }
        return true;
    });

    return (
        <div className='order-section'>
            <Sidebar />

            <div className='order-wraper'>
                <div className='filter-sort'>
                    <div>
                        <input
                            placeholder='Order ID, Name, Email or Phone'
                            name='order-id'
                            type='text'
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                    </div>
                    <div className='order-sort'>
                        <p>Sort Date
                            <span>
                                {sortDate ?
                                    <i className="fa-solid fa-arrow-up-wide-short" onClick={() => setSortDate(false)}></i> :
                                    <i className="fa-solid fa-arrow-down-wide-short" onClick={() => setSortDate(true)}></i>
                                }
                            </span>
                        </p>
                    </div>
                    <div className='order-filter'>
                        <label htmlFor="dropdown">Order Filter</label>
                        <select id="dropdown" onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
                            <option value="">All Order</option>
                            <option value="Open Order">Open</option>
                            <option value="In Enquiry">In Enquiry</option>
                            <option value="Order Accepted">Accepted</option>
                            <option value="Order Rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {searchedOrders.map(order => (
                    <div key={order.order_id} className='order-container'>
                        <div className='order-content header'>
                            <p className='order-id'><b>Order ID:</b> <span>{order.order_id}</span></p>
                            <p className='date-time'><b>Date/Time:</b> <span>{new Date(order.timestamp).toLocaleString()}</span></p>
                            <p className={`order-status ${order.order_status.toLowerCase().replace(" ", "-")}`}><b>Order Status:</b> <span>{order.order_status}</span></p>
                        </div>
                        <div className='order-content'>
                            <p><b>Ordered By: </b>{order.user?.name}</p>
                            <p><b>Mobile: </b>{order.user?.mobile}</p>
                            <p><b>Email: </b>{order.user?.email}</p>
                            <a href={`/orders/${order._id}`}><span>View Details</span></a>
                        </div>
                    </div>
                ))}

                <div style={{ paddingBottom: "100px" }}></div>
            </div>
        </div>
    );
}
