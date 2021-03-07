import React from 'react'

function ChatMessageCard ({message}) {

    return (
        <div className="chat-mess-card">
            {message.content}

        </div>
    )
}

export default ChatMessageCard