import React from 'react';
import ProfileIcon from './ProfileIcon';

const FriendListBox = ({username, setSelectedChatUser}) => {
    const handleClick = () => {
        setSelectedChatUser(() => username);
    };

    return (
        <div className="c-Friend-list-box" onClick={() => handleClick()}>
            <ProfileIcon />
            <p>@{username}</p>
        </div>
    )
}

export default FriendListBox;