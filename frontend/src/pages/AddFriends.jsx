import React from 'react';
import { NavLink } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';

import MainLayout from '../layout/MainLayout';
import FriendListBox from '../components/FriendListBox';
import ENUMS from '../config/enums';

const AddFriends = () => {
    return (
        <MainLayout title="Add Friends">
            <div className="c-Add-friends">
                <div className="c-Add-friends__Card c-Card">
                    <h1>Add Friends</h1>
                    <div className="c-Add-friends__Search">
                        <IconContext.Provider value={{ color: "#9D9D9D", size: "21px" }}>
                            <AiIcons.AiOutlineSearch className="c-Search__Icon" />
                        </IconContext.Provider>
                        <input type="text" placeholder="Search for friends" />
                    </div>
                    <div className="c-Add-friends__List">
                        <FriendListBox
                            username="jennierubyjane"
                            type={ENUMS.friendListMode.ADD}
                        />
                        <FriendListBox
                            username="jennierubyjane"
                            type={ENUMS.friendListMode.ADD}
                        />
                        <FriendListBox
                            username="jennierubyjane"
                            type={ENUMS.friendListMode.ADD}
                        />
                        <FriendListBox
                            username="jennierubyjane"
                            type={ENUMS.friendListMode.ADD}
                        />
                        <FriendListBox
                            username="jennierubyjane"
                            type={ENUMS.friendListMode.ADD}
                        />
                        <FriendListBox
                            username="jennierubyjane"
                            type={ENUMS.friendListMode.ADD}
                        />
                        <FriendListBox
                            username="jennierubyjane"
                            type={ENUMS.friendListMode.ADD}
                        />
                        <FriendListBox
                            username="jennierubyjane"
                            type={ENUMS.friendListMode.ADD}
                        />
                    </div>
                    <div className="c-Add-friends__Back">
                        <NavLink to="/friends" className="c-Btn c-Btn--primary-ocean">Back to Friends</NavLink>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default AddFriends;