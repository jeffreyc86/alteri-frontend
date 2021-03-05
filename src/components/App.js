import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentUser, setCurrentLocation } from "../features/userSlice"
import { setItems, setPendingRequests, setUserRequests, setUserDonations } from "../features/requestsSlice"
import Navbar from "./Navbar"
import SignInContainer from "./Login/SignInContainer"
import SignUpContainer from './SignUp/SignUpContainer';
import ProfileContainer from './ProfileContainer/ProfileContainer'
import RequestContainer from './NewRequest/RequestContainer'
import Footer from './Footer'
import PendingRequestContainer from './PendingRequestsContainer/PendingRequestsContainer';

function App() {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const currentLocation = useSelector(state => state.user.currentLocation)

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (token) {
      fetch(`${process.env.REACT_APP_RAILS_URL}show`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((user) => {
          const action = setCurrentUser(user);
          dispatch(action)
        });
    }
    getCurrentLocation()
  },[dispatch])

  function getCurrentLocation(){
    navigator.permissions.query({name:'geolocation'})
        .then(function(result) {
            if (result.state === 'granted') {
                navigator.geolocation.getCurrentPosition((position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        }
                    const action = setCurrentLocation(pos)
                    dispatch(action)
                });
            } else if (result.state === 'prompt') {
                getCurrentLocation()
            } else if (result.state === 'denied') {
                alert("Your location is required to use this app. You may always change the permissions within your internet settings.")
            }
        })
  }

  useEffect(()=>{
    if (currentUser) {
        fetch(`${process.env.REACT_APP_RAILS_URL}updatelocation/${currentUser.id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(currentLocation)
        })
    }
  }, [currentLocation])

  useEffect(()=>{
    dispatch(setPendingRequests())
    dispatch(setItems())
  },[dispatch])

  useEffect(()=>{
    if (currentUser) {
        fetch(`${process.env.REACT_APP_RAILS_URL}usersrequests/${currentUser.id}`)
            .then(res=>res.json())
            .then(data=>{
                const { requests, donated_requests } = data
                const requestAction = setUserRequests(requests)
                const donatedRequestAction = setUserDonations(donated_requests)
                dispatch(requestAction)
                dispatch(donatedRequestAction)
            })
    }
  }, [currentUser])

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/signin'>
            <SignInContainer />
        </Route>
        <Route exact path="/signup">
          <SignUpContainer />
        </Route>
        <Route exact path="/profile">
          <ProfileContainer />
        </Route>
        <Route exact path="/newrequest">
          <RequestContainer />
        </Route>
        <Route exact path="/pendingrequests">
          <PendingRequestContainer />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
