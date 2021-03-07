import React from 'react'
import {useSelector} from "react-redux"

function RequestCard ({request}){

    const currentUser = useSelector(state=>state.user.currentUser)


    let requestMatch
        if (request.recipient_id === currentUser.id){
            if (request.accepted === false) {
                requestMatch = <td>---</td>
            }
            else {
                requestMatch = 
                <td>
                    <div className="req-match"> 
                        <img src={request.donor_img} alt={request.donor_name} className="request-match-img"/>
                        <span>{request.donor_name}</span>
                    </div>
                </td>
            }
        } else if (request.donor_id === currentUser.id) {
            requestMatch = 
                <td>
                    <div className="req-match"> 
                        <img src={request.recipient_img} alt={request.recipient_name} className="request-match-img"/>
                        <span>{request.recipient_name}</span>
                    </div>
                </td>
        }

    let status 
        if (request.accepted === false) {
            status = 
                <td>
                    <div className="req-match"> 
                        <img src={process.env.PUBLIC_URL + "/images/pending.png"} alt="pending" className="request-status-img"/>
                        <span>Pending</span>
                    </div>
                </td>
        } else if (request.accepted === true && request.fulfilled === false) {
            status = 
                <td>
                    <div className="req-match"> 
                        <img src={process.env.PUBLIC_URL + "/images/accepted.png"} alt="accepted" className="request-status-img"/>
                        <span>Accepted</span>
                    </div>
                </td>
        } else if (request.fulfilled === true) {
            status = 
                <td>
                    <div className="req-match"> 
                        <img src={process.env.PUBLIC_URL + "/images/accepted.png"} alt="fulfilled" className="request-status-img"/>
                        <span>Fulfilled</span>
                    </div>
                </td>
        }
    
    const itemImages = request.request_items.map(item=>{
        return <img key={item.item_id} className="request-item-img" src={process.env.PUBLIC_URL + item.item_url} alt={item.item_name} />
    })

    return (
        <div className="request-card">
            <table className="request-info-table">
                <tbody>
                    <tr>
                        <td>#{request.id}</td>
                        <td>{request.created_date}</td>
                        {requestMatch}
                        {status}
                    </tr>
                </tbody>
            </table>
            <div className="request-items">
                <h4>Items Requested:</h4>
                {itemImages}
            </div>
        </div>
    )
}

export default RequestCard