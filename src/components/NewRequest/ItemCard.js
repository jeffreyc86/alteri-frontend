import React, {useState} from 'react'


function ItemCard ({addToRequest, item}) {

    const [preference, setPreference] = useState("")
    const [quantity, setQuantity] = useState(1)

    function prefReq(item){
        if (["Food", "Clothing"].includes(item.category)) {
            return true
        } else {
            return false
        }
    }

    function handleClick() {

        let newItem

        if (preference.length > 0) {
            newItem = {
                id: item.id,
                quantity: quantity,
                preference: preference
            }
        } else {
            newItem = {
                id: item.id,
                quantity: quantity,
            }
        }
        
        addToRequest(newItem)
    }

    return (
        <div className="item-card">
            <tr>
                <td><img className="item-image" src={process.env.PUBLIC_URL + item.image_url} alt={item.name} /></td>
                <td>{item.name}</td>
                {prefReq(item) && item.name !== "Bottled Water" ? 
                <td> 
                    <input type="text" value={preference} onChange={(e)=>setPreference(e.target.value)} placeholder={item.category === "Food" ? "Alergies / Preferences" : "Include a Size"}/>
                </td>
                : null}
                {item.multiple ? 
                <td>
                    <input type="number" value={quantity} onChange={(e)=>setQuantity(parseInt(e.target.value))} step="1" min="1" max={item.category==="Food" ? "5" : "3" } />
                </td>
                : null}
            </tr>
            <button onClick={handleClick} id={item.selected ? "remove-btn" : "add-btn"} className="add-remove-btn">{item.selected ? "Remove" : "Add"}</button>
        </div>

    )
}

export default ItemCard