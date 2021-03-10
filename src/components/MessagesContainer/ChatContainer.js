import React from 'react'
import {useSelector} from 'react-redux'
import ChatArea from './ChatArea'


function ChatContainer () {

    const convoId = useSelector(state=>state.conversations.convoId)

    return (
        <div className="chat-container">
            {convoId === 0 ? 
                <div className="default-chat-container">
                    <p>Select a Conversation on the left</p> 
                </div>
                : <ChatArea />}
        </div>
    )
}

export default ChatContainer