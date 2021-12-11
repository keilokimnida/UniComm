import React, { useState, useEffect } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io5';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

import MainLayout from '../layout/MainLayout';
import FriendListBox from '../components/FriendListBox';
import ProfileIcon from '../components/ProfileIcon';
import ENUMS from '../config/enums';

import { getToken } from '../utils/localStorageUtils';
import APP_CONFIG from '../config/appConfig';
import axios from 'axios';

const Friends = () => {
    const navigate = useNavigate();
    const token = getToken();
    let accountID;
    if (token) {
        const decodedToken = jwt_decode(token);
        accountID = decodedToken.account_id;
    }
    // State declarations
    const [friends, setFriends] = useState([]);
    const [account, setAccount] = useState(null);
    const [friendRequests, setFriendRequests] = useState([]);

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

                // Get list of friends
                const friendsRes = await axios.get(`${APP_CONFIG.baseUrl}/friendship/${accountID}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Get a list of incoming friend requests
                const incomingFriendReqRes = await axios.get(`${APP_CONFIG.baseUrl}/friendship/request/incoming`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log(incomingFriendReqRes);

                if (componentMounted) {
                    const accData = accRes.data;
                    setAccount(() => ({
                        username: accData.username,
                        email: accData.email,
                        pfp_type: accData.pfp_type
                    }));

                    const friendsData = friendsRes.data;
                    if (friendsData.length === 0) {
                        setFriends(() => []);
                    }
                    else {
                        setFriends(() => friendsData);
                    }

                    const incomingFriendReqData = incomingFriendReqRes.data;
                    if (incomingFriendReqData.length === 0) {
                        setFriendRequests(() => []);
                    }
                    else {
                        setFriendRequests(() => incomingFriendReqData);
                    }
                }
            }
            catch (error) {
                console.log(error);
                console.log(error.response);
                const errCode = error.response?.status;
                if (errCode === 401) {
                    navigate("/login");
                }
            }
        })();

        return (() => {
            componentMounted = false;
        });
    }, []);

    return (
        <MainLayout title="Friends">
            <div className="c-Friends">
                <div className="c-Friends__Card c-Card">
                    <div className="c-Card__Left">
                        {/* Friends */}
                        <div className="c-Card__Friends c-Friends">
                            <h1>Friend List</h1>
                            <div className="c-Friends__Search">
                                <IconContext.Provider value={{ color: "#9D9D9D", size: "21px" }}>
                                    <AiIcons.AiOutlineSearch className="c-Search__Icon" />
                                </IconContext.Provider>
                                <input type="text" placeholder="Search for friends" />
                            </div>

                            <div className="c-Friends__List">
                                {
                                    friends.length > 0 ?
                                        <FriendListBox
                                            username="dlwlrma"
                                            type={ENUMS.friendListMode.REMOVE}
                                        />
                                        :
                                        <p className="c-List__Empty">No friends found!</p>
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
                        {/* Incoming friend requests */}
                        <div className="c-Friend-requests">
                            <div className="c-Friend-requests__Sticky-heading">
                                <h2>Incoming Friend Requests</h2>
                                <span className="c-Divider c-Divider--horizontal"></span>
                            </div>
                            <div className="c-Friend-requests__List">
                                {
                                    friendRequests.length > 0 ?
                                        friendRequests.map((data, index) => {
                                            return <FriendListBox
                                                key={index}
                                                accData={data.account_addressee}
                                                username={data.account_addressee.username}
                                                type={ENUMS.friendListMode.REQUEST}
                                            />
                                        }
                                        )
                                        :
                                        <p className="c-List__Empty">No friends found!</p>
                                }
                            </div>
                        </div>
                        <span className="c-Divider c-Divider--horizontal"></span>
                        {/* Expand network */}
                        <div className="c-Expand-network">
                            <h2>Expand your network!</h2>
                            <NavLink to="/friends/add" className="c-Btn c-Btn--primary-ocean">Find Friends</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Friends;