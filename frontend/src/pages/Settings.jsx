import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io5';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";

import MainLayout from '../layout/MainLayout';
import ProfileIcon from '../components/ProfileIcon';
import { clearLocalStorage, getToken } from '../utils/localStorageUtils';
import APP_CONFIG from '../config/appConfig';

const Settings = () => {
    const navigate = useNavigate();
    const token = getToken();
    let accountID;
    if (token) {
        const decodedToken = jwt_decode(token);
        accountID = decodedToken.account_id;
    }

    // State declarations
    const [account, setAccount] = useState(null);

    useEffect(() => {
        let componentMounted = true;

        (async () => {
            try {
                // Get account information
                const accRes = await axios.get(`${APP_CONFIG.baseUrl}/account/${accountID}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (componentMounted) {
                    const accData = accRes.data;
                    setAccount(() => ({
                        username: accData.username,
                        email: accData.email,
                        pfp_type: accData.pfp_type
                    }));
                }

            }
            catch (error) {
                console.log(error);
            };
        })();

        return (() => {
            componentMounted = false;
        });
    }, []);

    const handleLogout = () => {
        clearLocalStorage();
        toast.success("You have successfully logged out!");
        navigate("/login");
    };

    return (
        <MainLayout title="Settings">
            <div className="c-Settings">
                <div className="c-Settings__Card c-Card">
                    <h1>Settings</h1>
                    {/* Account settings */}
                    <h2>Account settings</h2>
                    <h3>Email</h3>
                    <div className="c-Settings__Input">
                        <input type="email" disabled value={account?.email ? account.email : "Error"} />
                    </div>
                    <h3>Username</h3>
                    <div className="c-Settings__Input">
                        <input type="text" disabled value={account?.username ? account.username : "Error"} />
                    </div>

                    {/* Other settings */}
                    <h2>Other settings</h2>
                    <div className="c-Settings__Row">
                        <p>Enable Push Notifications</p>
                    </div>

                    {/* Danger zone */}
                    <h2>Danger Zone</h2>
                    <div className="c-Settings__Button">
                        <button type="button" className="c-Btn c-Btn--empty-danger">Delete Account</button>

                    </div>

                    {/* Log out */}
                    <div className="c-Settings__Button">
                        <button type="button" className="c-Btn c-Btn--empty-primary-ocean" onClick={() => handleLogout()}>Logout</button>
                    </div>
                    <span className="c-Divider c-Divider--horizontal" />
                    <div className="c-Card__Nav c-Nav">
                        <div className="c-Nav__Profile">
                            <ProfileIcon />
                            <h2>@{account?.username ? account.username : ""}</h2>
                        </div>
                        <div className="c-Nav__Items">
                            <NavLink to="/chats">
                                <IconContext.Provider value={{ color: "#9D9D9D", size: "21px" }}>
                                    <BsIcons.BsFillChatFill className="c-Chat__Icon" />
                                </IconContext.Provider>
                            </NavLink>
                            <NavLink to="/settings">
                                <IconContext.Provider value={{ color: "#9D9D9D", size: "21px" }}>
                                    <IoIcons.IoSettingsSharp className="c-Settings__Icon" />
                                </IconContext.Provider>
                            </NavLink>
                            <NavLink to="/friends">
                                <IconContext.Provider value={{ color: "#9D9D9D", size: "21px" }}>
                                    <FaIcons.FaUserFriends className="c-Friends__Icon" />
                                </IconContext.Provider>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Settings;