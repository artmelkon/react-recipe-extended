import React from "react";
import { Query } from "react-apollo";

import FormInput from "../FormInput/FormInput.component";
import CustomButton from '../CustomButton/CustomButton.component';
import Error from '../Error';
import { SIGNIN_USER } from "../../queries";

const initialState = {
  username: "",
  password: "",
};

class SignIn extends React.Component {
  state = { ...initialState};
  
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
                />
                <FormInput
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                />
                <CustomButton type="submit">
                  sign in
                </CustomButton>
                <CustomButton isGgoogleSignin>
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
