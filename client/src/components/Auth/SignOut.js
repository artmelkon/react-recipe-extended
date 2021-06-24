import React from 'react';
import { withRouter} from 'react-router-dom';
import { ApolloConsumer } from "@apollo/client";

const handleSignout = (client, history) => {
  localStorage.removeItem('token');
  client.resetStore();
  history.push('/signin')
}

const SignOut = ({ history }) => (
  <ApolloConsumer>
    {client => {
      console.log("logout client ", client);
      return (
        <button onClick={() => handleSignout(client, history)}>
          Sing Out
        </button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(SignOut);
