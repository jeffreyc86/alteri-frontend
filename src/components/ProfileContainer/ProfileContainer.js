import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentLocation} from "../../features/userSlice"
import ProfileBanner from "./ProfileBanner"


function ProfileContainer () {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const currentLocation = useSelector(state => state.user.currentLocation)

    function getCurrentLocation(){
        navigator.permissions.query({name:'geolocation'})
            .then(function(result) {
                if (result.state == 'granted') {
                    navigator.geolocation.getCurrentPosition((position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            }
                        const action = setCurrentLocation(pos)
                        dispatch(action)
                    });
                } else if (result.state == 'prompt') {
                    getCurrentLocation()
                } else if (result.state == 'denied') {
                    alert("Your location is required to use this app. You may always change the permissions within your internet settings.")
                }
            })
    }
    
    useEffect(()=>{
        getCurrentLocation()
    }, [dispatch])


    return (
        <div className="profile-container">
            <ProfileBanner />

        </div>
    )
}

export default ProfileContainer