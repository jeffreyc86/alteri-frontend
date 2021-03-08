import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import ChatMessageCard from './ChatMessageCard'


function ChatBox() {

    const userConvoMessages = useSelector(state=>state.messages.allMessages)
    const convoId = useSelector(state=>state.conversations.convoId)

    useEffect(() => {
        const chatBox = document.querySelector(".chat-box")
        chatBox.scroll({ top: chatBox.scrollHeight, behavior: 'smooth' });

      }, [userConvoMessages, convoId])

    let convoMessages
        if (userConvoMessages.length > 0) {
            convoMessages = userConvoMessages.filter(message => message.conversation_id === convoId)
        }
    
    let messageCards
        if (convoMessages && convoMessages.length > 0) {
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