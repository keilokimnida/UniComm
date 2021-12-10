import React from 'react';
import logo from '../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="c-Header">
            <div className="l-Header__Logo">
                <div className = "c-Header__Logo">
                    <NavLink to = "/"><img src = {logo} alt="Logo"/></NavLink>
                </div>
            </div>
        </header>
    )
}

export default Header;