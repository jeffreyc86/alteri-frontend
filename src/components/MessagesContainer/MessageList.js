import React from 'react'
import {useSelector} from 'react-redux'
import ConversationCard from './ConversationCard'

function MessageList ({setConvoId}) {

    const userConvos = useSelector(state=>state.conversations.userConvos)


    const convoCards = userConvos.map((convo) => {
        return <ConversationCard key={convo.id} conversation={convo} setConvoId={setConvoId} />
    })

    return(
        <div className="message-list">
            {convoCards}
        </div>
    )
}

export default MessageList