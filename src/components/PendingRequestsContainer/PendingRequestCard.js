import React from 'react'
import {useSelector} from "react-redux"
import { getDistance, convertDistance } from 'geolib'

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
        <div className="request-items">
            <h4>Items Requested:</h4>
            {/* {itemImages} */}
        </div>
    </div>
    )
}

export default PendingRequestCard