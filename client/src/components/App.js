import React from "react";
import { Switch, Route, Redirect } from "react-router";
// import { Query } from "react-apollo";
import { auth, createUserProfileDocument } from '../FireBase/FireBase.utils';

// import { GET_ALL_RECIPES } from "../queries/index";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";

import "./App.css";


class App extends React.Component {
  state = {
    currentUser: null
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    console.log('hell world')
    auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user }, () => console.log(user));
    })
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Redirect to="/" />
        </Switch>{" "}
      </div>
    );
  }
}

export default App;
