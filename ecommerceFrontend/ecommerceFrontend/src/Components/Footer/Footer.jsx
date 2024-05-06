import React from 'react'
import "./Footer.scss"
import { Link } from "react-router-dom";
import { STORE_NAME, PRODUCTS_NAME } from '../../Constants/DesignConstants';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='top'>
                <div className='item'>
                    <h1>Categories</h1>
                    <Link className="link" to="/products/2">{PRODUCTS_NAME}</Link>
                    <span>Dogs</span>
                    <span>Dog Food</span>
                    <span>Dog Accessories</span>
                    <span>New Arrivals</span>
                </div>
                <div className='item'>
                    <h1>Links</h1>
                    <span>FAQ</span>
                    <span>Pages</span>
                    <span>Stores</span>
                    <span>Compare</span>
                    <span>Cookies</span>
                </div>
                <div className='item'>
                    <h1>About</h1>
                    <span>
                        This is a new website!
                    </span>
                </div>
                <div className='item'>
                    <h1>Contact</h1>
                    <span>
                        Contact information
                    </span>
                </div>
            </div>
            <div className='bottom'>
                <div className='left'>
                    <span className='logo'>
                        {STORE_NAME}
                    </span>
                    <span className='copyright'>
                        Copyright 2024. All Rights Reserved
                    </span>
                </div>
                <div className='right'>
                    <img src="/images/payment.png" alt=''/>
                </div>
            </div>
        </div>
    )
}
export default Footer