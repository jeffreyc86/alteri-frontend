import React from 'react'


function RequestedItemCard ({reqItem}){

    return (
        <div className="requested-item-card">
            <img className="req-item-img" src={reqItem.item_url} alt={reqItem.item_name} />
            <br/>
            {reqItem.quantity} x {reqItem.item_name} 
            <br/>
            {reqItem.prefernces}
            


        </div>
    )
}

export default RequestedItemCard