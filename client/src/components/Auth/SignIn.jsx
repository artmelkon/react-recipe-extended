import React from "react";
import { Query } from "react-apollo";

import FormInput from "../FormInput/FormInput.component";
import CustomButton from '../CustomButton/CustomButton.component';
import { signInWithGoogle } from '../../FireBase/FireBase.utils';
import Error from '../Error';
import { SIGNIN_USER } from "../../queries";

const initialState = {
  username: '',
  password: '',
};

class SignIn extends React.Component{
  state = { ...initialState};

  handleChange = event => {
    const { name, value} = event.target;
    this.setState({[name]: value})
  }
  
  render() {
    const { username, password } = this.state;
    return (
      <div className="App">
        <h2 className="App">Sign In</h2>
        <Query query={SIGNIN_USER}>
          {() => {
            return (
              <form className="form">
                <FormInput
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Username"
                  required
                  onChange={this.handleChange}
                />
                <FormInput
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  required
                  onChange={this.handleChange}
                />
                <CustomButton type="submit">sign in</CustomButton>
                <CustomButton onClick={signInWithGoogle} isGoogleSignedIn>
                  google sign in
                </CustomButton>
              </form>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default SignIn;
