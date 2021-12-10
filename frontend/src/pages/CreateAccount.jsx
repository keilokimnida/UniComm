import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

import APP_CONFIG from '../config/appConfig';
import MainLayout from '../layout/MainLayout';

const CreateAccount = () => {
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleChangeText = (event) => {
        setInputValues((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${APP_CONFIG.baseUrl}/account`, {
                email: inputValues.email,
                username: inputValues.username,
                password: inputValues.password
            });

            const data = res.data;
            toast.success("Account has been created succesfully!");
            navigate('/login');
        }
        catch (error) {
            console.log(error);
            toast.error("Someting went wrong!");
        };
    };

    return (
        <MainLayout title="Create Account">
            <form className="c-Create-account">
                {/* Login Card */}
                <div className="l-Create-account__Card">
                    <div className="c-Create-account__Card">
                        <h1>Create Account</h1>
                        <div className="c-Create-account__Inputs">
                            <input value={inputValues.email} type="email" placeholder="Email" name="email" onChange={(event) => handleChangeText(event)}/>
                            <input value={inputValues.username} type="text" placeholder="Username" name="username" onChange={(event) => handleChangeText(event)}/>
                            <input value={inputValues.password} type="password" placeholder="Password" name="password" onChange={(event) => handleChangeText(event)}/>
                        </div>
                        <button type="submit" className="c-Btn c-Btn--primary-ocean" onClick={(event) => handleSubmit(event)}>Create Account</button>
                        <NavLink to="/login">Go to Login</NavLink>
                    </div>
                </div>
            </form>
        </MainLayout>
    )
}

export default CreateAccount;