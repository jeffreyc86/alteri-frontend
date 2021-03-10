import React from 'react'
import ConversationList from './ConversationList'
import ChatContainer from './ChatContainer'


function MessagesContainer () {

    return (
        <div className="messages-container">
             <img className="messages-banner" src={process.env.PUBLIC_URL + "/images/messages-banner.jpg"} alt="messages banner" />
            <div className="messages-area">
                <ConversationList />
                <ChatContainer />
            </div>
        </div>
    )
}

export default MessagesContainer