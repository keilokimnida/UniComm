import React from 'react';
import ENUMS from '../config/enums';
import ProfileIcon from './ProfileIcon';

const FriendListBox = ({ username, setSelectedChatUser, type }) => {

    const handleClick = () => {
        setSelectedChatUser(() => username);
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
                    <button type="button" className="c-Btn c-Btn--primary-ocean">Add</button>
                </div>
            </div>
        );
    }

}

export default FriendListBox;