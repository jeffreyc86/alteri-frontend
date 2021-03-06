import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

function ChatBanner () {

    const [showItems, setShowItems] = useState(false)
    const [showMap, setShowMap] = useState(false)

    const convoId = useSelector(state=>state.conversations.convoId)
    const userConvos = useSelector(state=>state.conversations.userConvos)
    const userRequests = useSelector(state=>state.requests.userRequests)
    const userDonations = useSelector(state=>state.requests.userDonations)

    const requestId = userConvos.find(convo => convo.id === convoId).request_id

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

    return (
        <div className="chat-banner">
            <div className="chat-banner-left">
                <h2>Request #{requestId}</h2>
                <button>Mark As Fulfilled</button>
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
                    {showMap ?
                        <div className="cb-dropdown-content">
                             <div>item</div>
                        </div> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatBanner