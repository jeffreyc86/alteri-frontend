import React, {useState} from "react"
import {useHistory} from 'react-router-dom'
import { useSelector } from "react-redux"
import MenuNav from "./MenuNav"
import MessagesNav from "./MessagesNav"

function Navbar ({logoutSubscriptions}) {

    const history = useHistory()
    const currentUser = useSelector(state => state.user.currentUser)

    const [showMenu, setShowMenu] = useState(false)
    const [showList, setShowList] = useState(false)

    function handleLogoClick() {
        history.push("/")
    }

    window.onclick = function(e) {
        if (!e.target.matches('.dropbtn') && !e.target.matches(".menu-btn")) {
            setShowMenu(false)
        }
        if (!e.target.matches('.mess-drop-btn') && !e.target.matches(".mess-btn")) {
            setShowList(false)
        }
    }

    return (
        <div className="navbar">
            <div className="navbar-left">
                <MenuNav showMenu={showMenu} setShowMenu={setShowMenu} logoutSubscriptions={logoutSubscriptions}/>
                {currentUser ? <MessagesNav showList={showList} setShowList={setShowList}/> : null}
            </div>
            <div className="navbar-right">
                <img className="navbar-logo" src={process.env.PUBLIC_URL + "/images/alteri_logo.jpg"} alt="alteri" onClick={handleLogoClick}/>
            </div>
        </div>
    )
}

export default Navbar