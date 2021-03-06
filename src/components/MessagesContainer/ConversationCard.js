import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setConvoId} from '../../features/conversationsSlice'

function ConversationCard({conversation}){

    const currentUser = useSelector(state=>state.user.currentUser)
    const convoId = useSelector(state=>state.conversations.convoId)
    const userMessages = useSelector(state=>state.messages.allMessages)

    const convoMessages = userMessages.filter(message => message.conversation_id === conversation.id)
    const mostRecentMessage = convoMessages.splice(-1)
    const dispatch = useDispatch()

    let reqMatch

    if (currentUser) {
        if (conversation.request_info.recipient_id === currentUser.id) {
            reqMatch = 
            <div className="cc-req-match"> 
                <img src={conversation.request_info.donor_img} alt={conversation.request_info.donor_name} />
                <div className="message-details">
                    <span>{conversation.request_info.donor_name}</span>
                    <br/>
                    test
                    {mostRecentMessage}
                </div>
            </div>       
        } else {
            reqMatch = 
            <div className="cc-req-match"> 
                <img src={conversation.request_info.recipient_img} alt={conversation.request_info.recipient_name} />
                <div className="message-details">
                    <span>{conversation.request_info.recipient_name}</span>
                    <br/>
                    tst
                    {mostRecentMessage}
                </div>
            </div>   
        }

    }

    return (
        <div className="convo-card" id={convoId === conversation.id ? "convo-selected" : null}onClick={()=>dispatch(setConvoId(conversation.id))}>
            {reqMatch}
            
        </div>
    )
}

export default ConversationCard