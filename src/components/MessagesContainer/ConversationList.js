import React from 'react'
import {useSelector} from 'react-redux'
import ConversationCard from './ConversationCard'

function ConversationList () {

    const userConvos = useSelector(state=>state.conversations.userConvos)


    let convoCards 
    
    if (userConvos.length > 0) {
        convoCards = userConvos.map((convo) => {
            return <ConversationCard key={convo.id} conversation={convo} />
        })
    }

    return(
        <div className="convo-list">
            <div className="convo-list-label">
                Conversation List
            </div>
            {convoCards}
        </div>
    )
}

export default ConversationList