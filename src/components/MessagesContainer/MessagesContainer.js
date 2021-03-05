import React from 'react'
import MessageList from './MessageList'
import ChatContainer from './ChatContainer'

function MessagesContainer () {

    return (
        <div className="messages-container">
            Hello
            <div className="messages-area">
                <MessageList />
                <ChatContainer />
            </div>
        </div>
    )
}

export default MessagesContainer