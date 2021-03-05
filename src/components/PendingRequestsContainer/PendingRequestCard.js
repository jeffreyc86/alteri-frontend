import React from 'react'
import {useSelector} from "react-redux"
import { getDistance, convertDistance } from 'geolib'
import RequestedItemCard from "./RequestedItemCard"

function PendingRequestCard({request}) {

    const currentLocation = useSelector(state=>state.user.currentLocation)
    const currentUser = useSelector(state=>state.user.currentUser)

    let distanceFrom 

        if (currentLocation) {
            distanceFrom = Math.round(
                convertDistance(getDistance(
                    { latitude: currentLocation.lat, longitude: currentLocation.lng },
                    { latitude: request.recipient_loc.lat, longitude: request.recipient_loc.lng }
                ), 'mi') * 100).toFixed(1)
        }

    const requestRecipient = (
        <td>
            <div className="req-match"> 
                <img src={request.recipient_img} alt={request.recipient_name} className="request-match-img"/>
                <span>{request.recipient_name}</span>
            </div>
        </td>
    )

    const requestedItems = request.request_items.map(reqItem=>{
        return <RequestedItemCard key={reqItem.id} reqItem={reqItem} />
    })

    function handleClick () {
        
    }


    return (
        <div className="request-card">
        <table className="request-info-table">
            <tbody>
                <tr>
                    <td>#{request.id}</td>
                    <td>{request.created_date}</td>
                    {requestRecipient}
                    <td>{distanceFrom} mi</td>
                </tr>
            </tbody>
        </table>
        <h5>Items Requested</h5>
        <div className="requested-items">
            {requestedItems}
        </div>
        <div className="accept-btn-div">
            <button>Accept Request</button>
        </div>
    </div>
    )
}

export default PendingRequestCard