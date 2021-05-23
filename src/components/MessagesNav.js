import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setConvoId } from '../features/conversationsSlice'
import {useHistory} from "react-router-dom"
import { isAfter, parseISO, isSameSecond } from 'date-fns'
import { BiMessageDetail } from "react-icons/bi";



function MessagesNav () {

    const history = useHistory()
    const dispatch = useDispatch()
    const currentUser = useSelector(state=>state.user.currentUser)
    const userMemberships = useSelector(state=>state.user.memberships)
    const userMessages = useSelector(state=>state.messages.allMessages)
    const userConvos = useSelector(state=>state.conversations.userConvos)

    function handleClick() {
        dispatch(setConvoId(0))
        history.push("/messages")
    }

    let convoNotifications = []
    let mostRecentMessages = []
    // get most recent messages from each conversation
    if (userConvos && userConvos.length > 0 && userMessages.length > 0) {
        const userConvoIds = userConvos.map(convo => convo.id)
    
        userConvoIds.forEach(convoId => {
            const lastConvoMessage = [...userMessages].reverse().find(message => message.conversation_id === convoId)
                if (lastConvoMessage) {
                    mostRecentMessages.push(lastConvoMessage)
                }
        })
    }
    
    // sees if the most recent messages from sender are after last read time
    if (mostRecentMessages.length > 0 && userMemberships.length > 0) {
        userMemberships.forEach(membership => {
            const recentConvoMessage = mostRecentMessages.find(message => message.conversation_id === membership.conversation_id)
            if (recentConvoMessage) {
                if (recentConvoMessage.user_id !== currentUser.id && isAfter(parseISO(recentConvoMessage.created_at), parseISO(membership.last_read))) {
                    convoNotifications.push(recentConvoMessage)
                }
            }
        })
    }

    // check for new conversations with that haven't been seen
    if (userConvos.length > 0 && userMessages.length > 0) {
        userConvos.forEach(convo => {
            const membership = userMemberships.find(memb => memb.conversation_id === convo.id)
            const anyMesssage = userMessages.find(message => message.conversation_id === convo.id)
                if (!anyMesssage && membership) {
                    if (
                      isSameSecond(
                        parseISO(membership.last_read),
                        parseISO(membership.created_at)
                      )
                    ) {
                      convoNotifications.push(convo);
                    }
                }
        })
    }

    return (
      <div className="dropdown">
        <div className="menu-div">
          <button className="mess-drop-btn" onClick={handleClick}>
            <BiMessageDetail className="menu-btn" />
          </button>
          {convoNotifications.length > 0 && (
            <span className="badge">{convoNotifications.length}</span>
          )}
        </div>
      </div>
    );
}

export default MessagesNav