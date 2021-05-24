import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateMemberships} from '../../features/userSlice'
import {setConvoId} from '../../features/conversationsSlice'
import { isAfter, parseISO, isSameSecond } from 'date-fns'

function ConversationCard({conversation}){

    const [newMessage,setNewMessage] = useState(false)
   

    const currentUser = useSelector(state=>state.user.currentUser)
    const userMemberships = useSelector(state=>state.user.memberships)
    const convoId = useSelector(state=>state.conversations.convoId)
    const userMessages = useSelector(state=>state.messages.allMessages)

    const convoMessages = userMessages.filter(message => message.conversation_id === conversation.id)
    
    let mostRecentMessage
        if (convoMessages.length > 0) {
            mostRecentMessage = [...convoMessages].splice(-1)[0].content
        }

    const dispatch = useDispatch()

    const convoMembership = userMemberships.find(memberS => memberS.conversation_id === conversation.id)
    
    
    useEffect(()=>{
        if (convoMessages && convoMembership) {
            const lastMessage = [...convoMessages].splice(-1)[0]
            const sameSec = isSameSecond(
              parseISO(convoMembership.last_read),
              parseISO(convoMembership.created_at)
            );
            if ((lastMessage && currentUser && lastMessage.user_id !== currentUser.id && isAfter(parseISO(lastMessage.created_at),parseISO(convoMembership.last_read))) || sameSec) {
                setNewMessage(true);
            } else {
              setNewMessage(false);
            }
        }
    }, [convoMembership, convoMessages, currentUser])

    let reqMatch

    if (currentUser) {
        if (conversation.request_info.recipient_id === currentUser.id) {
            reqMatch = 
            <div className="cc-req-match"> 
                <img src={conversation.request_info.donor_img} alt={conversation.request_info.donor_name} />
                <div className="message-details">
                    <span>{conversation.request_info.donor_name}</span>
                    <br/>
                    <div className="most-recent-message">
                        {mostRecentMessage}  
                    </div>
                </div>
                {newMessage ? <span className="new-message-notification">●</span> : null}
            </div>       
        } else {
            reqMatch = 
            <div className="cc-req-match"> 
                <img src={conversation.request_info.recipient_img} alt={conversation.request_info.recipient_name} />
                <div className="message-details">
                    <span>{conversation.request_info.recipient_name}</span>
                    <br/>
                    <div className="most-recent-message">{mostRecentMessage}</div>
                </div>
                {newMessage ? <span className="new-message-notification">●</span> : null}
            </div>   
        }

    }

    function handleClick () {
        
        dispatch(setConvoId(conversation.id))
        const membership = userMemberships.find(membership => membership.conversation_id === conversation.id)
        
        fetch(`${process.env.REACT_APP_RAILS_URL}memberships/${membership.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({last_read: Date()})
        })
            .then(res=>res.json())
            .then(updatedMembership=>{
                dispatch(updateMemberships(updatedMembership))
            })

    }

    return (
        <div className="convo-card" id={convoId === conversation.id ? "convo-selected" : null} onClick={handleClick}>
            {reqMatch}
            
        </div>
    )
}

export default ConversationCard