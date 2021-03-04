import React, {useEffect} from 'react'
// import {useHistory} from 'react-router-dom'
import ProfileBanner from "./ProfileBanner"
import RequestsListContainer from './RequestListsContainer/RequestListContainer'


function ProfileContainer () {

    return (
        <div className="profile-container">
            <ProfileBanner />
            <RequestsListContainer />
        </div>
    )
}

export default ProfileContainer