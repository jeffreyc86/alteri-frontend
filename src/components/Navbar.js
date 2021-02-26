import React from "react"
import { useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'


function Navbar () {

    const history = useHistory()
    const currentUser = useSelector(state => state.user.currentUser)

    return (
        <div className="navbar">

        </div>
    )
}

export default Navbar