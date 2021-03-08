import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setConvoId } from '../features/conversationsSlice'
import {useHistory} from "react-router-dom"
import { isAfter, parseISO } from 'date-fns'


function MessagesNav () {

    const history = useHistory()
    const dispatch = useDispatch()
    const userMemberships = useSelector(state=>state.user.memberships)
    const userMessages = useSelector(state=>state.messages.allMessages)
    const userConvos = useSelector(state=>state.conversations.userConvos)

    function handleClick() {
        dispatch(setConvoId(0))
        history.push("/messages")
    }

    let convoNotifications = []
    let mostRecentMessages = []
    if (userConvos && userConvos.length > 0 && userMessages.length > 0) {
        const userConvoIds = userConvos.map(convo => convo.id)
    
        userConvoIds.forEach(convoId => {
            const lastConvoMessage = [...userMessages].reverse().find(message => message.conversation_id === convoId)
                if (lastConvoMessage) {
                    mostRecentMessages.push(lastConvoMessage)
                }
        })
    }

    if (mostRecentMessages.length > 0 && userMemberships.length > 0) {
        userMemberships.map(membership => {
            const recentConvoMessage = mostRecentMessages.find(message => message.conversation_id === membership.conversation_id)
            if (recentConvoMessage) {
                if (isAfter(parseISO(recentConvoMessage.created_at), parseISO(membership.last_read))) {
                    convoNotifications.push(recentConvoMessage)
                }
            }
        })
    }

    if (userConvos.length > 0 && userMessages.length > 0) {
        userConvos.forEach(convo => {
            const anyMesssage = userMessages.find(message => message.conversation_id === convo.id)
                if (!anyMesssage) {
                    convoNotifications.push(convo)
                }
        })
    }

    return (
        <div className="dropdown">
            <div className="menu-div">
                <button className="mess-drop-btn" onClick={handleClick}>
                    <img className="mess-btn" src={process.env.PUBLIC_URL + "/images/messages.png"} alt="messages"/>
                </button>
                {convoNotifications.length > 0 && <span class="badge">{convoNotifications.length}</span>}
            </div>
        </div>
    )
}

export default MessagesNav