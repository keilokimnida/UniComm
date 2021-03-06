import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io5';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

import MainLayout from '../layout/MainLayout';
import ChatWelcome from '../components/ChatWelcome';
import ChatRoom from '../components/ChatRoom';
import ProfileIcon from '../components/ProfileIcon';
import FriendListBox from '../components/FriendListBox';
import ENUMS from '../config/enums';

import { getToken } from '../utils/localStorageUtils';
import APP_CONFIG from '../config/appConfig';

const Chats = () => {
    const navigate = useNavigate();
    const token = getToken();
    let accountID;
    if (token) {
        const decodedToken = jwt_decode(token);
        accountID = decodedToken.account_id;
    }
    // State declarations
    const [selectedChatUser, setSelectedChatUser] = useState(null);
    const [account, setAccount] = useState(null);
    const [chatRooms, setChatRooms] = useState(null);

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

                // Find chat room by account id
                const chatRoomRes = await axios.get(`${APP_CONFIG.baseUrl}/room/${accountID}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log(chatRoomRes);
                if (componentMounted) {
                    const accData = accRes.data;
                    setAccount(() => ({
                        username: accData.username,
                        email: accData.email,
                        pfp_type: accData.pfp_type
                    }));
                    const chatRoomData = chatRoomRes.data;

                    if (chatRoomData.length === 0) {
                        setChatRooms(() => null);
                    }
                    else {
                        setChatRooms(() => chatRoomData);
                    }

                }
            } catch (error) {
                console.log(error);
                const errCode = error.response?.status;
                if (errCode === 401) {
                    navigate("/login");
                }
            }
        })()
        return (() => {
            componentMounted = false;
        });
    }, []);

    return (
        <MainLayout title="Chats">
            <div className="c-Chats">
                <div className="c-Chats__Card c-Card">

                    <div className="c-Card__Left">
                        {/* Friends */}
                        <div className="c-Card__Friends c-Friends">
                            <h1>Chats</h1>
                            <div className="c-Friends__Search">
                                <IconContext.Provider value={{ color: "#9D9D9D", size: "21px" }}>
                                    <AiIcons.AiOutlineSearch className="c-Search__Icon" />
                                </IconContext.Provider>
                                <input type="text" placeholder="Search for friends" />
                            </div>

                            <div className="c-Friends__List">
                                {
                                    chatRooms ?
                                        <FriendListBox
                                            username="dlwlrma"
                                            type={ENUMS.friendListMode.CHAT}
                                            setSelectedChatUser={setSelectedChatUser}
                                        />
                                        :
                                        <p className = "c-List__Empty">No chats found!</p>
                                }
                            </div>
                        </div>
                        {/* Divider */}
                        <span className="c-Divider c-Divider--horizontal"></span>
                        {/* Nav */}
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

                    {/* Divider */}
                    <span className="c-Divider c-Divider--vertical"></span>

                    <div className="c-Card__Right">
                        {
                            selectedChatUser ?
                                <ChatRoom /> :
                                <ChatWelcome />
                        }
                    </div>
                </div>
            </div>
        </MainLayout>

    )
}

export default Chats;