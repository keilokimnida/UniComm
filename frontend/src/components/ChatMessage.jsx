import React from 'react';
import ENUMS from '../config/enums';

const ChatMessage = ({type, content}) => {
    
    const renderChatMessageContent = () => {
        if (type === ENUMS.messageFrom.ME) {
            return (
                <div className = "c-Chat-message c-Chat-message--me">
                    <p>{content}</p>
                </div>
            )
        }
    
        if (type === ENUMS.messageFrom.FRIEND) {
            return (
                <div className = "c-Chat-message c-Chat-message--friend">
                    <p>{content}</p>
                </div>
            )
        }
    }

    return (
    
    <div className = "l-Chat-message">
        {renderChatMessageContent()}
    </div>
    );

}

export default ChatMessage;