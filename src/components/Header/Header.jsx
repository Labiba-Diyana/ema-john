import React from 'react';
import logo from '../../images/Logo.svg'
import './Header.css'
const Header = () => {
    return (
        <div className='header'>
        <img src={logo} alt="" />
        <div>
            <a href="/Order">Order</a>
            <a href="/Order Review">Order Review</a>
            <a href="/Manage Inventory">Manage Inventory</a>
            <a href="/Login">Login</a>
        </div>
        </div>
    ); 
};

export default Header;