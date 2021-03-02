import { current } from '@reduxjs/toolkit'
import React from 'react'
import {useSelector} from 'react-redux'


function ProfileBanner () {

    const currentUser = useSelector(state=>state.user.currentUser)
    


    return (
        <div className="profile-banner">
            <div className="banner-box">
                <img src={process.env.PUBLIC_URL + "/images/profile-banner.jpg"} alt="profile banner" />
            </div>
            {currentUser ?
             <div className="profile-info">
                 <div style={{display: "flex"}}>
                    <img src={currentUser.photo_url} alt={currentUser.full_name} />
                    <h1>{currentUser.full_name}</h1>
                </div>
                <div className="join-date">
                    <img src={process.env.PUBLIC_URL + "/images/calendar.png"} alt="cal" id="calendar-logo"/>
                    <span>Joined {currentUser.join_date}</span>
                </div>
            </div>
            : null }
        </div>
    )
}

export default ProfileBanner