import React from "react";
import { Switch, Route, Redirect } from "react-router";
// import { Query } from "react-apollo";
import { auth } from '../FireBase/FireBase.utils';

// import { GET_ALL_RECIPES } from "../queries/index";
import Header from './Header/Header';
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";

import "./App.css";


class App extends React.Component {
  state = {
    currentGoogleUser: null
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ currentGoogleUser: user }, () => console.log(user.displayName, ':', user.email));
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
