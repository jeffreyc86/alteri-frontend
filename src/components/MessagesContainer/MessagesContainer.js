import React from 'react'
import ConversationList from './ConversationList'
import ChatContainer from './ChatContainer'


function MessagesContainer () {

    return (
        <div className="messages-container">
            <h1>Messages</h1>
            <div className="messages-area">
                <ConversationList />
                <ChatContainer />
            </div>
        </div>
    )
}

export default MessagesContainer