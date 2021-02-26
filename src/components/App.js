import React from 'react';
import { Counter } from './Counter';
import { Route, Switch } from 'react-router-dom'
import LoginContainer from "./Login/LoginContainer"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
      </header>

      <Route>
          <LoginContainer />
      </Route>
    </div>
  );
}

export default App;
