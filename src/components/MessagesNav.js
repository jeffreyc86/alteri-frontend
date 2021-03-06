import React from 'react'
import { useDispatch } from "react-redux"
import { setConvoId } from '../features/conversationsSlice'
import {useHistory} from "react-router-dom"


function MessagesNav () {

    const history = useHistory()
    const dispatch = useDispatch()

    function handleClick() {
        dispatch(setConvoId(0))
        history.push("/messages")
    }


    return (
        <div className="dropdown">
            <div className="menu-div">
                <button className="mess-drop-btn" onClick={handleClick}>
                    <img className="mess-btn" src={process.env.PUBLIC_URL + "/images/messages.png"} alt="messages"/>
                </button>
                <span>Messages</span>
            </div>
        </div>
    )
}

export default MessagesNav