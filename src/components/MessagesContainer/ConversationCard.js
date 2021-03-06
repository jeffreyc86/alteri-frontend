import React, {useEffect} from 'react'
import consumer from "../cable"
import { useSelector } from 'react-redux'

function ConversationCard({conversation, setConvoId}){

    const currentUser = useSelector(state=>state.user.currentUser)

    useEffect(() => {
        const subscription = consumer.subscriptions.create({
            channel: "MessageChannel",
            id: conversation.id
        },{
            received: (message) => {console.log(message)}
        })

        return () => {
            subscription.unsubscribe()
        }

    }, [conversation])

    let reqMatch

    if (currentUser) {
        if (conversation.request_info.recipient_id === currentUser.id) {
            reqMatch = 
            <div className="cc-req-match"> 
                <img src={conversation.request_info.donor_img} alt={conversation.request_info.donor_name} />
                <span>{conversation.request_info.donor_name}</span>
            </div>       
        } else {
            reqMatch = 
            <div className="cc-req-match"> 
                <img src={conversation.request_info.recipient_img} alt={conversation.request_info.recipient_name} />
                <span>{conversation.request_info.recipient_name}</span>
            </div>   
        }

    }

    return (
        <div className="convo-card" onClick={()=>setConvoId(conversation.id)}>
            {reqMatch}
            
        </div>
    )
}

export default ConversationCard