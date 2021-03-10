import React from 'react'
import { useSelector } from 'react-redux'
import RequestCard from './RequestCard'

function RequestsListContainer () {

    const requests = useSelector(state=>state.requests.userRequests)
    const donatedRequests = useSelector(state=>state.requests.userDonations)

    
    const pendingRequests = requests.map(request => {
            return <RequestCard key={request.id} request={request} />
        })

    const donationRequests = donatedRequests.map(request => {
            return <RequestCard key={request.id} request={request} />
        })
    
    return (
        <div className="requests-list">
            {requests.length === 0 && donatedRequests.length === 0 ? 
            <div className="request-info">
                <h3>You haven't made or accepted any requests or donations</h3> 
                <p>Please visit our requests page to help someone in need or create a request.</p>
            </div>
            : null}
            <div className="request-info">
                {requests.length > 0 &&
                <div>
                    <h1>Requests</h1>
                    <table className="request-info-table">
                        <tbody>
                            <tr>
                                <th>Request Number</th>
                                <th>Date Created</th>
                                <th>Donor</th>
                                <th>Status</th>
                            </tr>
                        </tbody>
                    </table>
                    {pendingRequests}
                </div> }
                {donatedRequests.length > 0 &&
                <div>
                    <h1>Donations</h1>
                    <table className="request-info-table">
                        <tbody>
                            <tr>
                                <th>Request Number</th>
                                <th>Date Created</th>
                                <th>Recipient</th>
                                <th>Status</th>
                            </tr>
                        </tbody>
                    </table>
                    {donationRequests}
                </div>}
            </div>
    

        </div>
    )
}

export default RequestsListContainer


