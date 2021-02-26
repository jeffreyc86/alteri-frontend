import React, { useEffect } from 'react';
import { Counter } from './Counter';
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../features/userSlice"
import Navbar from "./Navbar"
import SignInContainer from "./Login/SignInContainer"
import SignUpContainer from './Sign-Up/SignUpContainer';

function App() {

  const dispatch = useDispatch()

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
  },[])


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
      </Switch>
    </div>
  );
}

export default App;
