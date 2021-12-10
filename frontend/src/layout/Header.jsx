import React from 'react';
import logo from '../assets/images/logo.png';

const Header = () => {
    return (
        <header className="c-Header">
            <div className="l-Header__Logo">
                <div className = "c-Header__Logo">
                    <img src = {logo} alt="Logo"/>
                </div>
            </div>
        </header>
    )
}

export default Header;