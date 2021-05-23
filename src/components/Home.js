import React from 'react'

function Home () {

    const homeBanner = (process.env.PUBLIC_URL + "./images/home.jpg")

    return (
        <div className="home">
            <img src={homeBanner} alt="home" className="home-page"/>
        </div>
    )
}

export default Home