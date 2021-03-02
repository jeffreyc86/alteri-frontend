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

    if (item.category === "Food" && quantity > 5){
        setQuantity(5)
    } else if (item.category === "clothing" && quantity > 3){
        setQuantity(3)
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
            <table>
                <tbody>
                    <tr>
                        <td className="img-column"><img className="item-image" src={process.env.PUBLIC_URL + item.image_url} alt={item.name} /></td>
                        <td className="item-name">{item.name}</td>
                        <td className="pref-column"> 
                            {prefReq(item) && item.name !== "Bottled Water" ? <input type="text" value={preference} onChange={(e)=>setPreference(e.target.value)} placeholder={item.category === "Food" ? "Allergies / Dietary Preferences" : "Sizing Requirements"}/> : null}
                        </td>
                        <td className="quantity-column">
                            {item.multiple ? <input type="number" value={quantity} onChange={(e)=>setQuantity(parseInt(e.target.value))} step="1" min="1" max={item.category==="Food" ? "5" : "3" } /> : null}               
                        </td>
                        <td className="btn-column"><button onClick={handleClick} id={item.selected ? "remove-btn" : "add-btn"} className="add-remove-btn">{item.selected ? "Remove" : "Add"}</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default ItemCard