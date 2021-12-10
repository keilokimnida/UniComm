import React from 'react';
import { NavLink } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';

const CreateAccount = () => {
    return (
        <MainLayout title="Create Account">
            <div className="c-Create-account">
                {/* Login Card */}
                <div className="l-Create-account__Card">
                    <div className="c-Create-account__Card">
                        <h1>Create Account</h1>
                        <div className="c-Create-account__Inputs">
                            <input type="text" placeholder="Email" />
                            <input type="text" placeholder="Username" />
                            <input type="password" placeholder="Password" />
                            <input type="password" placeholder="Confirm Password" />
                        </div>
                        <button type="button" className="c-Btn c-Btn--primary-ocean">Create Account</button>
                        <NavLink to="/login">Go to Login</NavLink>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default CreateAccount;