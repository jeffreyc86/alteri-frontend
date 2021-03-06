import React from 'react'
import ChatBanner from './ChatBanner'
import ChatMessageCard from './ChatMessageCard'
import {useSelector} from 'react-redux'


function ChatArea () {

    const convoId = useSelector(state=>state.conversations.convoId)

    return (
        <div className="chat-area">
                <ChatBanner />

        </div>
    )
}

export default ChatArea