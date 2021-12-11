import axios from 'axios';
import React, { useState } from 'react';
import { toast } from "react-toastify";

import ENUMS from '../config/enums';
import ProfileIcon from './ProfileIcon';

import { getToken } from '../utils/localStorageUtils';
import APP_CONFIG from '../config/appConfig';

const FriendListBox = ({ username, accData, setSelectedChatUser, type }) => {
    const token = getToken();

    const handleClick = () => {
        setSelectedChatUser(() => username);
    };

    const handleAddFriend = async () => {
        try {
            const res = await axios.post(`${APP_CONFIG.baseUrl}/friendship/request/${accData.account_id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(res);
            toast.success("Friend request has been successfuly sent");
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        };
    };

    if (type === ENUMS.friendListMode.CHAT) {
        return (
            <div className="c-Friend-list-box c-Friend-list-box--enabled" onClick={() => handleClick()}>
                <div className="c-Friend-list-box__Details">
                    <ProfileIcon />
                    <p>@{username}</p>
                </div>
            </div>
        );
    }
    if (type === ENUMS.friendListMode.REMOVE) {
        return (
            <div className="c-Friend-list-box c-Friend-list-box--disabled">
                <div className="c-Friend-list-box__Details">
                    <ProfileIcon />
                    <p>@{username}</p>
                </div>
                <div className="c-Friend-list-box__Functions">
                    <button type="button" className="c-Btn c-Btn--empty-danger">Remove</button>
                </div>
            </div>
        );
    }
    if (type === ENUMS.friendListMode.REQUEST) {
        return (
            <div className="c-Friend-list-box c-Friend-list-box--disabled">
                <div className="c-Friend-list-box__Details">
                    <ProfileIcon />
                    <p>@{username}</p>
                </div>
                <div className="c-Friend-list-box__Functions">
                    <button type="button" className="c-Btn c-Btn--empty-primary-ocean">Accept</button>
                    <button type="button" className="c-Btn c-Btn--empty-black">Decline</button>
                </div>
            </div>
        );
    }
    if (type === ENUMS.friendListMode.ADD) {
        return (
            <div className="c-Friend-list-box c-Friend-list-box--enabled">
                <div className="c-Friend-list-box__Details">
                    <ProfileIcon />
                    <p>@{username}</p>
                </div>
                <div className="c-Friend-list-box__Functions">
                    <button type="button" className="c-Btn c-Btn--primary-ocean" onClick={() => handleAddFriend()}>Add</button>
                </div>
            </div>
        );
    }

}

export default FriendListBox;