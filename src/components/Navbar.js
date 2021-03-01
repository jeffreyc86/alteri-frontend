import React, {useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import {NavLink, useHistory} from 'react-router-dom'
import { setCurrentLocation, setCurrentUser } from "../features/userSlice"



function Navbar () {

    const history = useHistory()
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    const [showMenu, setShowMenu] = useState(false)

    function handleLogoClick() {
        history.push("/")
    }

    function handleLogOut() {
        localStorage.removeItem("token")
        const action = setCurrentUser(null);
        dispatch(action)
        const action2 = setCurrentLocation(null)
        dispatch(action2)
    }

    window.onclick = function(e) {
        if (!e.target.matches('.dropbtn') && !e.target.matches(".menu-btn")) {
            setShowMenu(false)
        }
    }

    return (
        <div className="navbar">
            <div className="navbar-left">
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
            </div>
            <div className="navbar-right">
                <img className="navbar-logo" src={process.env.PUBLIC_URL + "/images/alteri_logo.jpg"} alt="alteri" onClick={handleLogoClick}/>
            </div>
        </div>
    )
}

export default Navbar