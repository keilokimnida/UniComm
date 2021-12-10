import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

import MainLayout from '../layout/MainLayout';
import APP_CONFIG from '../config/appConfig';
import { saveUserToken } from '../utils/localStorageUtils';

const Login = () => {
    const navigate = useNavigate();
    // State declarations
    const [inputValues, setInputValues] = useState({
        identifier: "",
        password: ""
    })

    const handleChangeText = (event) => {
        setInputValues((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${APP_CONFIG.baseUrl}/login`, {
                identifier: inputValues.identifier,
                password: inputValues.password
            });

            const data = res.data;
            saveUserToken(data.token);
            navigate('/chats');
        }
        catch (error) {
            console.log(error);
            toast.error("Someting went wrong!");
        };
    };

    return (
        <MainLayout title="Login">
            <form className="c-Login">
                {/* Login Card */}
                <div className="l-Login__Card">
                    <div className="c-Login__Card">
                        <h1>Login</h1>
                        <div className="c-Login__Inputs">
                            <input value={inputValues.identifier} type="text" placeholder="Username/Email" name="identifier" onChange={(event) => handleChangeText(event)}/>
                            <input value={inputValues.password} type="password" placeholder="Password" name="password" onChange={(event) => handleChangeText(event)}/>
                        </div>
                        <button type="submit" className="c-Btn c-Btn--primary-ocean" onClick={(event) => handleLogin(event)}>Login</button>
                        <NavLink to="/create-account">Go to Create Account</NavLink>
                    </div>
                </div>
            </form>
        </MainLayout>
    )
}

export default Login;