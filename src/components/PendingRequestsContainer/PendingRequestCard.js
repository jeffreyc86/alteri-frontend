import React from 'react'
import {useSelector} from "react-redux"
import { getDistance, convertDistance } from 'geolib'
import RequestedItemCard from "./RequestedItemCard"

function PendingRequestCard({request}) {

    const currentLocation = useSelector(state=>state.user.currentLocation)

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
            <h4>Items Requested</h4>
        <div className="requested-items">
            {requestedItems}
        </div>
        <button>Accept Request</button>
    </div>
    )
}

export default PendingRequestCard