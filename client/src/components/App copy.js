import React from "react";
import { Query } from "react-apollo";
import { auth, createUserProfileDocument } from '../FireBase/FireBase.utils';

import { GET_ALL_RECIPES } from "../queries/index";
import "./App.css";


class App extends React.Component {
  state = {
    currentUser: null
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
      console.log(user);
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Home</h1>
        <Query query={GET_ALL_RECIPES}>
          {({ data, loading, error }) => {
            if(loading) return <div>Loading...</div>
            if(error) return <div>Error!</div>
            console.log(data)
            return <p>Recipes</p>;
          }}
        </Query>
      </div>
    )
  }
}

export default App;
