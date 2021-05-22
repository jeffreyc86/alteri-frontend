import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import {
  setCurrentUser,
  setCurrentLocation,
  addMembership,
} from "../features/userSlice";
import {
  setPendingRequests,
  setUserRequests,
  setUserDonations,
  updatePendingRequests,
  updateUserRequests,
  addPendingRequest,
} from "../features/requestsSlice";
import { addMessage, fetchAllMessages } from "../features/messagesSlice";
import { fetchUserConvos, addConvo } from "../features/conversationsSlice";
import {
  setPendingReqSub,
  setUserReqSubs,
  setUserConvoSubs,
} from "../features/subscriptionsSlice";
import { consumer, createConnection } from "./cable";
import useSubscriptions from "../features/useSubscriptions";

import Navbar from "./Navbar";
import Home from "./Home";
import SignInContainer from "./Login/SignInContainer";
import SignUpContainer from "./SignUp/SignUpContainer";
import ProfileContainer from "./ProfileContainer/ProfileContainer";
import RequestContainer from "./NewRequest/RequestContainer";
import Footer from "./Footer";
import PendingRequestContainer from "./PendingRequestsContainer/PendingRequestsContainer";
import MessagesContainer from "./MessagesContainer/MessagesContainer";

function App() {
  // REDUX
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentLocation = useSelector((state) => state.user.currentLocation);
  const userConvos = useSelector((state) => state.conversations.userConvos);
  const userRequests = useSelector((state) => state.requests.userRequests);

  // LOCAL HOOKS
  const ws = useSubscriptions();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${process.env.REACT_APP_RAILS_URL}show`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((user) => {
          dispatch(setCurrentUser(user));
        });
    }
  }, []);

  const getCurrentLocation = useCallback(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            const action = setCurrentLocation(pos);
            dispatch(action);
          });
        } else if (result.state === "prompt") {
          getCurrentLocation();
        } else if (result.state === "denied") {
          alert(
            "Your location is required to use this app. You may always change the permissions within your internet settings."
          );
        }
      });
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation, currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetch(
        `${process.env.REACT_APP_RAILS_URL}updatelocation/${currentUser.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentLocation),
        }
      );
    }
  }, [currentUser, currentLocation]);

  useEffect(() => {
    dispatch(setPendingRequests());
  }, []);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchAllMessages(currentUser.id));
      dispatch(fetchUserConvos(currentUser.id));
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetch(`${process.env.REACT_APP_RAILS_URL}usersrequests/${currentUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          const { requests, donated_requests } = data;
          const requestAction = setUserRequests(requests);
          const donatedRequestAction = setUserDonations(donated_requests);
          dispatch(requestAction);
          dispatch(donatedRequestAction);
        });
    }
  }, [currentUser]);

  // REDUX state.subscriptions
  const userReqSubs = useSelector((state) => state.subscriptions.userReqSubs);
  const userConvoSubs = useSelector(
    (state) => state.subscriptions.userConvoSubs
  );

  // create the consumer connection
  useEffect(() => {
    if (currentUser) {
      ws.createWebSocket();
    }
  }, [currentUser]);

  // create subscriptions for user requests
  // useEffect(() => {
  //   if (userRequests.length > 0) {
  //     const usersPendingRequests = [...userRequests].filter(
  //       (req) => req.fulfilled === false
  //     );

  //     if (usersPendingRequests.length > 0) {
  //       const connectionMap = userReqSubs;
  //       usersPendingRequests.forEach((request) => {
  //         // debugger
  //         if (!userReqSubs[request.id]) {
  //           const subscription = consumer.subscriptions.create(
  //             {
  //               channel: "RequestChannel",
  //               id: request.id,
  //             },
  //             {
  //               connected: () => {
  //                 console.log(`request ${request.id} connected`);
  //               },
  //               received: (data) => {
  //                 debugger;
  //                 if (data.request) {
  //                   dispatch(updateUserRequests(data.request));
  //                 } else {
  //                   const request = data[0];
  //                   const membership = data[1];
  //                   const conversation = data[2];
  //                   dispatch(updatePendingRequests(request));
  //                   dispatch(updateUserRequests(request));
  //                   dispatch(addMembership(membership));
  //                   dispatch(addConvo(conversation));
  //                 }
  //               },
  //               disconnected: () => {
  //                 console.log(`request ${request.id} DISconnected`);
  //               },
  //             }
  //           );

  //           connectionMap[request.id] = subscription;
  //         }
  //       });
  //       dispatch(setUserReqSubs(connectionMap));
  //     }
  //   }
  // }, [userRequests, dispatch]);

  // create subscriptions for user convos
  // useEffect(() => {
  //   if (userConvos && userConvos.length > 0) {
  //     const connectionMap = userConvoSubs;
  //     userConvos.forEach((convo) => {
  //       // debugger
  //       if (!userConvoSubs[convo.id]) {
  //         const subscription = consumer.subscriptions.create(
  //           {
  //             channel: "MessageChannel",
  //             id: convo.id,
  //           },
  //           {
  //             connected: () => {
  //               console.log(`convo ${convo.id} connected`);
  //             },
  //             received: (message) => {
  //               dispatch(addMessage(message));
  //             },
  //             disconnected: () => {
  //               console.log(`convo ${convo.id} DISconnected`);
  //             },
  //           }
  //         );

  //         connectionMap[convo.id] = subscription;
  //       }
  //     });
  //     dispatch(setUserConvoSubs(connectionMap));
  //   }
  // }, [userConvos]);

  function logoutSubscriptions() {
    // unsubscribe to the connections
    // userReqSubs.forEach((sub) => sub.unsubscribe());
    // convoSubs.forEach((sub) => sub.unsubscribe());
  }

  return (
    <div className="App">
      <Navbar logoutSubscriptions={logoutSubscriptions} />
      <ReduxToastr
        timeOut={500000}
        removeOnHoverTimeOut={10000}
        preventDuplicates
        progressBar
        closeOnToastrClick
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signin">
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
