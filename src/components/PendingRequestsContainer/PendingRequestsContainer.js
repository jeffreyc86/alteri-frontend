import React, {useState, useEffect} from 'react'
import PendingRequestCard from "./PendingRequestCard"
import { useSelector} from "react-redux"


function PendingRequestContainer () {

    const [openRequests, setOpenRequests] = useState([])
    
    const currentUser = useSelector(state=>state.user.currentUser)
    const pendingRequests = useSelector(state=>state.requests.allPendingRequests)

    useEffect(()=>{
        if (currentUser)
        setOpenRequests([...pendingRequests].filter(req => req.recipient_id !== currentUser.id))
    },[pendingRequests, currentUser])


    const pendingReqCards = openRequests.map(request => {
            return <PendingRequestCard key={request.id} request={request} />
        })

    return (
        <div className="pending-req-container">
            <table className="request-info-table">
                    <tbody>
                        <tr>
                            <th>Request Number</th>
                            <th>Date Created</th>
                            <th>Recipient</th>
                            <th>Distance Away</th>
                        </tr>
                    </tbody>
                </table>
            {pendingReqCards}
        </div>
    )
}

export default PendingRequestContainer