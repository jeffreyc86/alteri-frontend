import React from 'react'
import ChatBanner from './ChatBanner'
import ChatBox from './ChatBox'
import MessageForm from './MessageForm'

function ChatArea () {

    return (
        <div className="chat-area">
                <ChatBanner />
                <ChatBox />
                <MessageForm />
        </div>
    )
}

export default ChatArea