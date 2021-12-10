import React from 'react';
import { NavLink } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';

const Login = () => {
    return (
        <MainLayout title="Login">
            <div className="c-Login">
                {/* Login Card */}
                <div className="l-Login__Card">
                    <div className="c-Login__Card">
                        <h1>Login</h1>
                        <div className="c-Login__Inputs">
                            <input type="text" placeholder="Username/Email" />
                            <input type="password" placeholder="Password" />
                        </div>
                        <button type="button" className="c-Btn c-Btn--primary-ocean">Login</button>
                        <NavLink to="/create-account">Go to Create Account</NavLink>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Login;