import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {NavLink} from 'react-router-dom'
import { setCurrentLocation, setCurrentUser } from "../features/userSlice"

function MenuNav ({showMenu, setShowMenu}) {

    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()


    function handleLogOut() {
        localStorage.removeItem("token")
        const action = setCurrentUser(null);
        dispatch(action)
        const action2 = setCurrentLocation(null)
        dispatch(action2)
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
                            <NavLink to="/signup" exact>Sign Up</NavLink>
                            <NavLink to="/signin" exact>Sign In</NavLink>
                        </>
                    }
                </div> 
                : null}
        </div>
    )
}

export default MenuNav