import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {NavLink} from 'react-router-dom'
import { logoutUser } from "../features/userSlice"
import { logoutUserMessages } from "../features/messagesSlice"
import { logoutUserRequests } from "../features/requestsSlice"
import { logoutUserConversations } from "../features/conversationsSlice"
import useSubscriptions from "../features/useSubscriptions"

function MenuNav ({showMenu, setShowMenu }) {

    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    const ws = useSubscriptions()

    // unsubscribe to the connections
    function logoutSubscriptions() {
        // userReqSubs.forEach((sub) => sub.unsubscribe());
        // convoSubs.forEach((sub) => sub.unsubscribe());
        console.log("logout");
        ws.disconnectUserReqSubs();
    }

    function handleLogOut() {
        localStorage.removeItem("token")
        dispatch(logoutUser())
        dispatch(logoutUserRequests())
        dispatch(logoutUserMessages())
        dispatch(logoutUserConversations())
        logoutSubscriptions()
    }

    return(
        <div className="dropdown">
            <div className="menu-div">
                <button className="dropbtn" onClick={()=>setShowMenu(show=>!show)}>
                    <img className="menu-btn" src={process.env.PUBLIC_URL + "/images/menu.png"} alt="menu"/>
                </button>
                <span>Menu</span>
            </div>
            {showMenu ? 
                <div className="dropdown-content">
                    {currentUser ? 
                        <>  
                            <NavLink to="/newrequest" exact>Create Request</NavLink>
                            <NavLink to="/pendingrequests" exact>Pending Requests</NavLink>
                            <NavLink to="/profile" exact>Profile</NavLink>
                            <NavLink to="/" exact onClick={handleLogOut}>Logout</NavLink>
                        </>
                        : <>
                            <NavLink to="/signin" exact>Sign In</NavLink>
                            <NavLink to="/signup" exact>Sign Up</NavLink>
                        </>
                    }
                </div> 
                : null}
        </div>
    )
}

export default MenuNav