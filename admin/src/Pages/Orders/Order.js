import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { OrderContext } from '../../ContextAPI/OrderContext';

export default function Order() {
    const { orders } = useContext(OrderContext);
    const { orderID } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Filter orders to find the matching order by ID
        const filteredOrder = orders.find(order => order._id === orderID);
        setOrder(filteredOrder);
    }, [orderID, orders]);

    return (
        <div className='order-summary-section'>
            <Sidebar />
            <div className='order-summary-container'>
                <h1 className='page-header'>Order Summary</h1>
                {order && (
                    <div className='order-wrapper'>
                        <div className='order-content header'>
                            <p className='order-id'><b>Order ID:</b> <span>{order.order_id}</span></p>
                            <p className='date-time'><b>Date/Time:</b> <span>{new Date(order.timestamp).toLocaleString()}</span></p>
                            <p className={`order-status ${order.order_status.toLowerCase().replace(" ", "-")}`}><b>Order Status:</b> <span>{order.order_status}</span></p>
                        </div>
                        {order.orders.map((item, index) => (
                            <div className='order-lists' key={index}>
                                <h1 className='order-index'>{index + 1}.</h1>
                                <img src={`https://cdn-images.valence-am.com/${item.product_id}.jpg`} alt={item.product_name} />
                                <div className='order-specs'>
                                    <a href={`https://valence-am.com/products/${item.product_id}`} target='__blank'>{item.product_name}</a>
                                    <h3>{item.product_category}</h3>
                                    <div className='order-phy-prop'>
                                        {item.product_properties.map(property => (
                                            <>
                                                <p key={property.property_id}><b>{property.property_name}:</b> {property.value} {property.unit}</p>
                                                {property.customized && <p><b>Required Value:</b> {property.custom_value} {property.unit}</p>}
                                            </>
                                        ))}
                                    </div>
                                </div>
                                <p className='qty'>{item.quantity} QTY</p>
                            </div>
                        ))}
                        <div className='user_details'>
                            <h3>Enquirer Profile</h3>
                            <div className='order-content'>
                                <p><b>Name: </b>{order.user?.name}</p>
                                <p><b>Company Name: </b>{order.user?.company_name}</p>
                                <p><b>Mobile: </b>{order.user?.mobile}</p>
                                <p><b>Email: </b>{order.user?.email}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
