import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io5';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { NavLink } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import ChatWelcome from '../components/ChatWelcome';
import ChatRoom from '../components/ChatRoom';
import ProfileIcon from '../components/ProfileIcon';
import FriendListBox from '../components/FriendListBox';
import ENUMS from '../config/enums';

const Chats = () => {

    // State declarations
    const [selectedChatUser, setSelectedChatUser] = useState(null);

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
                                <FriendListBox
                                    username="dlwlrma"
                                    type={ENUMS.friendListMode.CHAT}
                                    setSelectedChatUser={setSelectedChatUser}
                                />
                            </div>
                        </div>
                        {/* Divider */}
                        <span className="c-Divider c-Divider--horizontal"></span>
                        {/* Nav */}
                        <div className="c-Card__Nav c-Nav">
                            <div className="c-Nav__Profile">
                                <ProfileIcon />
                                <h2>@keilokimnida</h2>
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