import React, {useState} from 'react'
import {Route} from 'react-router-dom'
import MessageList from './MessageList'
import ChatContainer from './ChatContainer'


function MessagesContainer () {

    const [convoId, setConvoId] = useState(0)

    return (
        <div className="messages-container">
            Hello
            <div className="messages-area">
                <MessageList setConvoId={setConvoId} />
                <ChatContainer convoId={convoId} />
            </div>
        </div>
    )
}

export default MessagesContainer