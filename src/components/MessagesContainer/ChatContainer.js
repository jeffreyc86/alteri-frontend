import React from 'react'
import ChatMessageCard from './ChatMessageCard'


function ChatContainer ({convoId}) {


    return (
        <div className="chat-container">
            {convoId === 0 ? <p>Select a Conversation on the left</p> : "testing"}
        </div>
    )
}

export default ChatContainer