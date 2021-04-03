import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import '../index.css'

import Home from './Home.js'
import LogIn from './LogIn.js'
import SignUp from './SignUp.js'

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/"> <Home /> </Route>
          <Route path="/login"> <LogIn /> </Route>
          <Route path="/signup"> <SignUp /> </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App