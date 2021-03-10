import React from 'react'

function Home () {

    const homeBanner = (process.env.PUBLIC_URL + "./images/home.jpg")
    const mobileHomeBanner = (process.env.PUBLIC_URL + "./images/home-mobile.jpg")

    return (
        <div className="home">
            <img src={window.innerWidth < 600 ? mobileHomeBanner : homeBanner} alt="home" className="home-page"/>
        </div>
    )
}

export default Home