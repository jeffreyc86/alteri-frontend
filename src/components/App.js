import React, { useCallback, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { toastr } from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { setCurrentUser, setCurrentLocation } from "../features/userSlice";
import {
  setPendingRequests,
  setUserRequests,
  setUserDonations,
} from "../features/requestsSlice";
import { fetchAllMessages } from "../features/messagesSlice";
import { fetchUserConvos } from "../features/conversationsSlice";
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

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      // success
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        dispatch(setCurrentLocation(pos));
      },
      // error
      () => {
        toastr.light(
          "Your location is required to use this app",
          "You may always change the permissions within your internet settings",
          { icon: "info", status: "info", removeOnHoverTimeOut: 2000 }
        );
      }
    );
  };

  useEffect(
    () => {
      getCurrentLocation();
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
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
    },
    // eslint-disable-next-line
    [currentLocation, currentUser]
  );

  useEffect(
    () => {
      dispatch(setPendingRequests());
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      if (currentUser) {
        dispatch(fetchAllMessages(currentUser.id));
        dispatch(fetchUserConvos(currentUser.id));
      }
    },
    // eslint-disable-next-line
    [currentUser]
  );

  useEffect(
    () => {
      if (currentUser) {
        fetch(
          `${process.env.REACT_APP_RAILS_URL}usersrequests/${currentUser.id}`
        )
          .then((res) => res.json())
          .then((data) => {
            const { requests, donated_requests } = data;
            const requestAction = setUserRequests(requests);
            const donatedRequestAction = setUserDonations(donated_requests);
            dispatch(requestAction);
            dispatch(donatedRequestAction);
          });
      }
    },
    // eslint-disable-next-line
    [currentUser]
  );

  // Create the Consumer connection
  useEffect(
    () => {
      if (currentUser) {
        ws.createWebSocket();
      }
    },
    // eslint-disable-next-line
    [currentUser]
  );

  // currentUser is authed, create pending request subscription
  useEffect(
    () => {
      if (currentUser) {
        ws.createPendingSub();
      }

      // Componet Unmounts
      return () => {
        ws.disconnectPendingSub();
      };
    },
    // eslint-disable-next-line
    [currentUser]
  );

  // Manage userReqSubs Websockets
  useEffect(
    () => {
      if (currentUser && userRequests.length > 0) {
        // creates subscriptions for unfulfilled requests
        const usersPendingRequests = userRequests.filter(
          (req) => req.fulfilled === false
        );
        ws.createUserReqSubs(usersPendingRequests);
      }

      // UnMount
      return () => ws.disconnectUserReqSubs();
    },
    // eslint-disable-next-line
    [currentUser, userRequests]
  );

  // Manage userConvoSubs Websockets
  useEffect(
    () => {
      if (currentUser && userConvos.length > 0) {
        // creates subscriptions for user converations
        ws.createUserConvoSubs(userConvos);
      }

      // UnMount
      return () => ws.disconnectUserConvoSubs();
    },
    // eslint-disable-next-line
    [currentUser, userConvos]
  );

  return (
    <div className="App">
      <Navbar />
      <ReduxToastr
        timeOut={5000}
        preventDuplicates={true}
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
