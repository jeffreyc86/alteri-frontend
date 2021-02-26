import React, { useEffect } from 'react'
import consumer from "./cable"


function MessageList ({conversation}) {

    useEffect(()=>{
        if (conversation.id) {
            const subscription = consumer.subscriptions.create({
                channel: "MessagesChannel",
                conversation_id: conversation.id
            }, {
                connected: () => console.log("connected"),
                disconnected: () => console.log("disconnected"),
                received: data => console.log("received", data)
            })

            // may not need
            return () => {
                subscription.unsubscribe()
            }
        }
        
    }, [conversation.id])

    


    return (
        <div className="message-list">

        </div>
    )
}