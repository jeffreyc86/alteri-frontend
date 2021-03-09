import React from 'react'
import ChatBanner from './ChatBanner'
import {useSelector} from 'react-redux'
import ChatBox from './ChatBox'
import MessageForm from './MessageForm'

function ChatArea () {
    
    const convoId = useSelector(state=>state.conversations.convoId)

    return (
        <div className="chat-area">
                <ChatBanner />
                <ChatBox />
                <MessageForm />
        </div>
    )
}

export default ChatArea