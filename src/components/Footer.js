import React from 'react'
import {useHistory} from "react-router-dom"

function Footer(){

    const history = useHistory()

    function logoClick(){
        history.push("/")
    }

    return (
        <div className="footer">
            <a href="https://www.feedingamerica.org/">Feeding America</a>
            <a href="https://www.cityharvest.org/">City Harvest</a>
            <img className="footer-logo" src={process.env.PUBLIC_URL + "/images/logo-clear-background.png"} alt="logo" onClick={logoClick}/>
            <a href="https://www.helpusa.org/">Help USA</a>
            <a href="https://www.coalitionforthehomeless.org/">Coalition for the Homeless</a>
        </div>
    )
}


export default Footer;