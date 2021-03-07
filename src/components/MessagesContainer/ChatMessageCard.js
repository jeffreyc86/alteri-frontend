import React from 'react'
import { parseJSON, formatDistanceToNow } from 'date-fns'
import {useSelector} from 'react-redux'

function ChatMessageCard ({message}) {


    const currentUser = useSelector(state=>state.user.currentUser)
    const timeAgo = formatDistanceToNow(parseJSON(message.created_at))

    let sentReceived = null

    if (currentUser) {
        if (message.user_id === currentUser.id) {
            sentReceived = "sent"
        } else {
            sentReceived = "received"
        }
    }
    return (
        <div className="chat-mess-card" id={sentReceived}>
            <span className={sentReceived}>{timeAgo} ago</span>
            <br/>
            <hr/>
            <div>
                <img src={message.user_photo} alt={message.user_id} className={sentReceived}/>
                <p className={sentReceived}>{message.content}</p>
            </div>
        </div>
    )
}

export default ChatMessageCard