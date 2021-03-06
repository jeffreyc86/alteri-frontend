import React from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import {acceptRequest} from "../../features/requestsSlice"
import {addMembership} from "../../features/userSlice"
import {addConvo, setConvoId} from "../../features/conversationsSlice"
import { getDistance, convertDistance } from 'geolib'
import RequestedItemCard from "./RequestedItemCard"

function PendingRequestCard({request}) {

    const currentLocation = useSelector(state=>state.user.currentLocation)
    const currentUser = useSelector(state=>state.user.currentUser)
    const dispatch = useDispatch()
    const history = useHistory()

    let distanceFrom = "Unavailable"

        if (currentLocation && request.recipient_loc.lat) {
            const distance = (
                convertDistance(getDistance(
                    { latitude: currentLocation.lat, longitude: currentLocation.lng },
                    { latitude: request.recipient_loc.lat, longitude: request.recipient_loc.lng }
                ), 'mi')).toFixed(1)
            distanceFrom = `${distance} mi`
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
        fetch(`${process.env.REACT_APP_RAILS_URL}acceptrequest/${request.id}`,{
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({donor_id: currentUser.id})
            })
            .then(res=>res.json())
            .then(data => {
                dispatch(acceptRequest(data.request))
                dispatch(addConvo(data.conversation))
                dispatch(addMembership(data.membership))
                dispatch(setConvoId(data.conversation.id))
            })

            history.push('/messages')

        
    }


    return (
        <div className="request-card">
        <table className="request-info-table">
            <tbody>
                <tr>
                    <td>#{request.id}</td>
                    <td>{request.created_date}</td>
                    {requestRecipient}
                    <td>{distanceFrom}</td>
                </tr>
            </tbody>
        </table>
        <h5>Items Requested</h5>
        <div className="requested-items">
            {requestedItems}
        </div>
        <div className="accept-btn-div">
            <button onClick={handleClick}>Accept Request</button>
        </div>
    </div>
    )
}

export default PendingRequestCard