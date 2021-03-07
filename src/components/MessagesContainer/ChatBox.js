import React from 'react'
import {useSelector} from 'react-redux'
import ChatMessageCard from './ChatMessageCard'


function ChatBox() {

    const userConvoMessages = useSelector(state=>state.messages.allMessages)
    const convoId = useSelector(state=>state.conversations.convoId)

    let convoMessages
        if (userConvoMessages.length > 0) {
            convoMessages = userConvoMessages.filter(message => message.conversation_id === convoId)
        }
    
    let messageCards
        if (convoMessages.length > 0) {
            messageCards = convoMessages.map(message=>{
                return <ChatMessageCard key={message.id} message={message} />
            })
        }


    return (
        <div className="chat-box">
            ChatBox
            {messageCards}
        </div>
    )
}

export default ChatBox