import React from 'react'
import PendingRequestCard from "./PendingRequestCard"
import { useSelector, useDispatch} from "react-redux"


function PendingRequestContainer () {

    const pendingRequests = useSelector(state=>state.requests.pendingRequests)

    let pendingReqCards
    
    if (pendingRequests.length > 1) {
        pendingReqCards = pendingRequests.map(request => {
            return <PendingRequestCard key={request.id} request={request} />
        })
    }

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