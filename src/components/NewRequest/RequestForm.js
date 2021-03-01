import React, {useState, useEffect} from 'react'
import {useSelector} from "react-redux"
import {useHistory} from 'react-router-dom'
import ItemCard from './ItemCard.js'


function RequestForm () {

    const currentUser = useSelector(state=>state.user.currentUser)
    const history = useHistory()
    
    const [selectedItems, setSelectedItems] = useState([])
    const [items, setItems] = useState([])
    const [filter, setFilter] = useState("")


    useEffect(()=>{
        fetch(`${process.env.REACT_APP_RAILS_URL}items`)
            .then(res=>res.json())
            .then(itemsArr => {
                const newArray = itemsArr.map(item=>{
                    return {
                        ...item,
                        selected: false
                    }
                })
                setItems(newArray)
            })
    }, [])

    function addToRequest(itemAdded) {

        const item = items.find(item=> item.id === itemAdded.id)

        if (item.selected === true) {
            const newArray = items.map(item => {
                if (item.id === itemAdded.id) {
                    return {
                        ...item,
                        selected: !item.selected
                    }
                } else {
                    return item
                }
            })
            setItems(newArray)

            const newArr = selectedItems.filter(item => item.id !== itemAdded.id)
            setSelectedItems(newArr)
        } else if (item.selected === false && selectedItems.length === 10) {
            alert(`There is a 10 item limit to each request. Please remove an item before adding ${item.name}.`)
        } else {
            const newArray = items.map(item => {
                if (item.id === itemAdded.id) {
                    return {
                        ...item,
                        selected: !item.selected
                    }
                } else {
                    return item
                }
            })
            setItems(newArray)

            const newArr = [...selectedItems, itemAdded]
            setSelectedItems(newArr)
        }

    }

    const filteredItems = items.filter(item=>item.name.toLowerCase().includes(filter.toLowerCase()))
        
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



    return (
        <div className="request-form-container">
            {filteredFoods.length > 0 ? <h3>Food</h3> : null}
            {filteredFoods}
            {filteredPandemic.length > 0 ? <h3>Pandemic Necessities</h3> : null}
            {filteredPandemic}
            {filteredHygiene.length > 0 ? <h3>Hygiene Essentials</h3> : null}
            {filteredHygiene}
            {filteredClothes.length > 0 ? <h3>Clothing</h3> : null}
            {filteredClothes}
            {filteredMisc.length > 0 ? <h3>Miscellaneous</h3> : null}
            {filteredMisc}
        </div>
    )
}

export default RequestForm