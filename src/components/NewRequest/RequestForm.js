import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {useHistory} from 'react-router-dom'
import { createNewRequest } from "../../features/requestsSlice"
import ItemCard from './ItemCard.js'


function RequestForm () {

    const currentUser = useSelector(state=>state.user.currentUser)
    const items = useSelector(state=>state.requests.items)
    const history = useHistory()
    const dispatch = useDispatch()
    
    const [selectedItems, setSelectedItems] = useState([])
    const [itemsArr, setItemsArr] = useState([])
    const [filter, setFilter] = useState("")


    useEffect(()=>{
        const newArray = items.map(item=>{
            return {
                ...item,
                selected: false
            }
        })
        setItemsArr(newArray)
    }, [])

    function addToRequest(itemAdded) {

        const item = itemsArr.find(item=> item.id === itemAdded.id)

        if (item.selected === true) {
            const newArray = itemsArr.map(item => {
                if (item.id === itemAdded.id) {
                    return {
                        ...item,
                        selected: !item.selected
                    }
                } else {
                    return item
                }
            })
            setItemsArr(newArray)

            const newArr = selectedItems.filter(item => item.id !== itemAdded.id)
            setSelectedItems(newArr)
        } else if (item.selected === false && selectedItems.length === 10) {
            alert(`There is a 10 item limit to each request. Please remove an item before adding ${item.name}.`)
        } else {
            const newArray = itemsArr.map(item => {
                if (item.id === itemAdded.id) {
                    return {
                        ...item,
                        selected: !item.selected
                    }
                } else {
                    return item
                }
            })
            setItemsArr(newArray)

            const newArr = [...selectedItems, itemAdded]
            setSelectedItems(newArr)
        }

    }

    const filteredItems = itemsArr.filter(item=>item.name.toLowerCase().includes(filter.toLowerCase()))
        
    const filteredFoods = [...filteredItems].filter(item => item.category === "Food")
        .map(item => {
                return <ItemCard key={item.id} item={item} addToRequest={addToRequest} />
        })
    
    const filteredPandemic = [...filteredItems].filter(item => item.category === "Pandemic Necessities")
        .map(item => {
                return <ItemCard key={item.id} item={item} addToRequest={addToRequest} />
        })

    const filteredHygiene = [...filteredItems].filter(item => item.category === "Hygiene")
        .map(item => {
                return <ItemCard key={item.id} item={item} addToRequest={addToRequest} />
        })

    const filteredClothes = [...filteredItems].filter(item => item.category === "Clothing")
        .map(item => {
                return <ItemCard key={item.id} item={item} addToRequest={addToRequest} />
        })

    const filteredMisc = [...filteredItems].filter(item => item.category === "Miscellaneous")
        .map(item => {
                return <ItemCard key={item.id} item={item} addToRequest={addToRequest} />
        })


    function submitRequest() {
        if (selectedItems.length < 1) {
            alert("Please select the items you need prior to submitting the request.")
        } else {
            const recipient_id = currentUser.id
            fetch(`${process.env.REACT_APP_RAILS_URL}requests`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ recipient_id, selectedItems })
            })
                .then(res=>res.json())
                .then(requestObj=>{
                    dispatch(createNewRequest(requestObj))
                })
            history.push("/profile")
        }
    }


    return (
        <div className="request-form">
            <h2>How This Works</h2>
            <p>To add items to your request, simply tap the add button. The default quantity per item on each request is one. However, you may request up to five of some Food items and up to three of some Clothing items. Please include any allergies and dietary restrictions for Food, as well as sizing preferences for Clothing. We depend on the kindness and integrity of our users, so <strong>there is a limit of 10 items per request.</strong> </p>
            <p>Once you're complete, submit your request. You will receive a notification as soon as your request been accepted and a chat will be created for you to sort out logistics with your donor. <strong>We ALWAYS suggest meeting in a safe and public location.</strong></p>
            <div className="request-details">
                {selectedItems.length === 10 ? <p>You have reached the maximum number of items</p> : null}
                <div className="request-complete">
                    <h3>Your Current Request Contains <span>{selectedItems.length}</span> {selectedItems.length === 1 ? "Item" : "Items"}</h3>
                    <button onClick={submitRequest}>Complete Request</button>
                </div>
            </div>
            <div className="search-filter">
                <label htmlFor="search">Find an Item by Name</label>
                <input type="text" value={filter} onChange={(e)=>setFilter(e.target.value)} />
                <button className="filter-btn" onClick={()=>setFilter("")}>Clear</button>
            </div>
            {filteredPandemic.length > 0 ? <h1>Pandemic Necessities</h1> : null}
            {filteredPandemic}
            {filteredFoods.length > 0 ? <h1>Food</h1> : null}
            {filteredFoods}
            {filteredHygiene.length > 0 ? <h1>Hygiene Essentials</h1> : null}
            {filteredHygiene}
            {filteredClothes.length > 0 ? <h1>Clothing</h1> : null}
            {filteredClothes}
            {filteredMisc.length > 0 ? <h1>Miscellaneous</h1> : null}
            {filteredMisc}
        </div>
    )
}

export default RequestForm