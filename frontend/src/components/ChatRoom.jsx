import React, { useRef, useEffect } from 'react'
import ENUMS from '../config/enums';
import ChatMessage from './ChatMessage';
import ProfileIcon from './ProfileIcon';

const ChatRoom = () => {

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest' })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, []);

    return (
        <div className = "c-Chat-room">
            <div className = "c-Chat-room__Top">
                <div className = "c-Top__Pfp">
                    <ProfileIcon />
                </div>
                <div className = 'c-Top__Details'>
                    <h1>@dlwlrma</h1>
                    <p>Online</p>
                </div>
            </div>
            <span className = "c-Divider c-Divider--horizontal"></span>
            <div className = "c-Chat-room__Messages">
                <p className = "c-Messages__Timestamp">November 26, 2021</p>
                <ChatMessage
                    type={ENUMS.messageFrom.ME}
                    content="Yessirimnidaimnidadiamdianda sid asodj aosjdojas oijdo ajosidj osajo djsoajd oijaois djo"
                    />
                    <ChatMessage
                    type={ENUMS.messageFrom.FRIEND}
                    content="Yesir"
                    />
                     <ChatMessage
                    type={ENUMS.messageFrom.FRIEND}
                    content="Yesir"
                    />
                     <ChatMessage
                    type={ENUMS.messageFrom.FRIEND}
                    content="Yesir"
                    />
                     <ChatMessage
                    type={ENUMS.messageFrom.FRIEND}
                    content="Yesir"
                    />
                     <ChatMessage
                    type={ENUMS.messageFrom.FRIEND}
                    content="Yesir"
                    />
                     <ChatMessage
                    type={ENUMS.messageFrom.FRIEND}
                    content="Yesir"
                    />
                     <ChatMessage
                    type={ENUMS.messageFrom.FRIEND}
                    content="Yesir"
                    />
                     <ChatMessage
                    type={ENUMS.messageFrom.FRIEND}
                    content="Yesir"
                    />
                    <span ref={messagesEndRef}/>
            </div>
            <div className = "c-Chat-room__Input">
                <input type = "text" placeholder="Type something..."/>
            </div>
        </div>
    )
}

export default ChatRoom;