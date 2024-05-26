import React from 'react';
import "./Loader.css";

export default function Loader(props) {
    return (
        <div className="network-loader">
            <p className="loader-message">{props.message}</p>
        </div>
    )
}
