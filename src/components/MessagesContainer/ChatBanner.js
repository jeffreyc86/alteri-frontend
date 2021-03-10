import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { updateUserDonations, updateUserRequests} from "../../features/requestsSlice"
import MapContainer from './MapContainer'

function ChatBanner () {

    const [showItems, setShowItems] = useState(false)
    const [showMap, setShowMap] = useState(false)
    const dispatch = useDispatch()

    const currentUser = useSelector(state=>state.user.currentUser)
    const convoId = useSelector(state=>state.conversations.convoId)
    const userConvos = useSelector(state=>state.conversations.userConvos)
    const userRequests = useSelector(state=>state.requests.userRequests)
    const userDonations = useSelector(state=>state.requests.userDonations)

    let requestId
    if (userConvos.length > 0){
        requestId = userConvos.find(convo => convo.id === convoId).request_id
    }

    const request = [...userRequests, ...userDonations].find(req => req.id === requestId)

    window.onclick = function(e) {
        if (!e.target.matches('.items-dropbtn')) {
            setShowItems(false)
        }
        if (!e.target.matches('.map-dropbtn')) {
            setShowMap(false)
        }
    }

    let itemList

    if (request) {
        itemList = request.request_items.map((item)=>{
            return (
                <div key={item.id} className="item-dropdown">
                    <div className="item-dd-info">
                            {item.quantity} x {item.item_name}
                            <p>{item.preference}</p>
                    </div>
                    <img src={process.env.PUBLIC_URL + item.item_url} alt={item.item_name}/>
                </div>
            )
        })
    }

    let requestOrDonation
    if (currentUser && request) {
        if (request.donor_id === currentUser.id){
            requestOrDonation = "Donation"
        } else {
            requestOrDonation = "Request"
        }
    }

    function handleClick () {
        fetch(`${process.env.REACT_APP_RAILS_URL}fulfillrequest/${request.id}`,{
            method: 'PATCH',
            headers: {"Content-Type": 'application/json'}
        })
            .then(res=>res.json())
            .then(requestObj=>{
                if (request.donor_id === currentUser.id) {
                    dispatch(updateUserDonations(requestObj))
                } else {
                    dispatch(updateUserRequests(requestObj))
                }
            })
    }

    let fulfilled = null
    if (request) {
        if (request.fulfilled ) {
            fulfilled = " - Fulfilled"
        }
    }

    let button = null
    if (request) {
        if (!request.fulfilled ) {
            button = <button onClick={handleClick}>Mark As Fulfilled</button>
        }
    }

    return (
        <div className="chat-banner">
            <div className="chat-banner-left">
                <h2>{requestOrDonation} #{requestId}{fulfilled}</h2>
                <div>
                {button}
                </div>
            </div>
            <div className="chat-banner-right">
                <div className="cb-dropdown">
                    <button onClick={()=>{setShowItems(show=>!show)}} className="items-dropbtn">Items</button>
                    {showItems ? 
                        <div className="cb-dropdown-content">
                            {itemList}
                        </div> : null}
                </div>
                <div className="cb-dropdown">
                    <button onClick={()=>setShowMap(show=>!show)} className="map-dropbtn">Map</button>
                    {showMap &&
                        <div className="cb-dropdown-content" id="map">
                            <MapContainer request={request}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatBanner
