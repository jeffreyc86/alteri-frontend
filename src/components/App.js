import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentUser, setCurrentLocation, addMembership } from "../features/userSlice"
import { setPendingRequests, setUserRequests, setUserDonations, updatePendingRequests, updateUserRequests, addPendingRequest } from "../features/requestsSlice"
import { addMessage, fetchAllMessages } from "../features/messagesSlice"
import { fetchUserConvos, addConvo } from "../features/conversationsSlice"
import consumer from './cable'

import Navbar from "./Navbar"
import SignInContainer from "./Login/SignInContainer"
import SignUpContainer from './SignUp/SignUpContainer';
import ProfileContainer from './ProfileContainer/ProfileContainer'
import RequestContainer from './NewRequest/RequestContainer'
import Footer from './Footer'
import PendingRequestContainer from './PendingRequestsContainer/PendingRequestsContainer';
import MessagesContainer from './MessagesContainer/MessagesContainer';


function App() {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const currentLocation = useSelector(state => state.user.currentLocation)
  const userConvos = useSelector(state=>state.conversations.userConvos)
  const userRequests = useSelector(state=>state.requests.userRequests)
  const pendingRequests = useSelector(state=>state.requests.allPendingRequests)

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
          dispatch(setCurrentUser(user)); 
        });
    }
  },[dispatch])

  const getCurrentLocation = useCallback(() => {
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
  }, [dispatch])

  useEffect(()=>{
    getCurrentLocation()
  }, [getCurrentLocation, currentUser])
  
   useEffect(()=>{
    if (currentUser) {
        fetch(`${process.env.REACT_APP_RAILS_URL}updatelocation/${currentUser.id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(currentLocation)
        })
    }
  }, [currentUser, currentLocation])

  useEffect(()=>{
    dispatch(setPendingRequests())
  },[dispatch])

  useEffect(()=>{
    if (currentUser) {
      dispatch(fetchAllMessages(currentUser.id))
      dispatch(fetchUserConvos(currentUser.id))
    }
  },[currentUser, dispatch])

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
  }, [currentUser, dispatch])


  useEffect(() => {

    userConvos.forEach(convo=>{

      const subscription = consumer.subscriptions.create({
          channel: "MessageChannel",
          id: convo.id
      },{
        received: message => {
          dispatch(addMessage(message))
        }
      })
    
      return () => {
          subscription.unsubscribe()
      }
    })


  }, [userConvos, dispatch])

  useEffect(() => {

      const subscription = consumer.subscriptions.create({
          channel: "PendingRequestsChannel",
      },{
        connected: ()=>{console.log("pending requests connected")},
        received: request => {
          dispatch(addPendingRequest(request))
        }
      })
    
      return () => {
          subscription.unsubscribe()
      }

  }, [dispatch])

  useEffect(() => {

    if (userRequests.length > 0) {
      const usersPendingRequests = [...userRequests].filter(req=>req.accepted === false)
      
      if (usersPendingRequests.length > 0) {
        usersPendingRequests.forEach(request=>{

          const subscription = consumer.subscriptions.create({
              channel: "RequestChannel",
              id: request.id
          },{
            connected: ()=>console.log("connected"),
            received: data => {
              const request = data[0]
              const membership = data[1]
              const conversation = data[2]
              dispatch(updatePendingRequests(request))
              dispatch(updateUserRequests(request))
              dispatch(addMembership(membership))
              dispatch(addConvo(conversation))
            }
          })
        
          return () => {
              subscription.unsubscribe()
          }
        })
      }
    
    }
  }, [userRequests])

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
        <Route exact path="/messages/">
          <MessagesContainer />
        </Route>
        
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
