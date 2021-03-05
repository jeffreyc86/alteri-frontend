import React from 'react'


function RequestedItemCard ({reqItem}){

    return (
        <div className="requested-item-card">
            <img className="req-item-img" src={reqItem.item_url} alt={reqItem.item_name} />
            <p>{reqItem.quantity} x {reqItem.item_name}</p>
            <p className="req-item-pref">{reqItem.preference}</p>
        </div>
    )
}

export default RequestedItemCard