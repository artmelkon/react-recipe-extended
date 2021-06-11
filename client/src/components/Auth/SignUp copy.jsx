import React from "react";
import { Mutation } from 'react-apollo';

import FormInput from "../form-input/FormInput.component";
import { SIGNUP_USER } from '../../queries/index';

class SignUp extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (even, signupUser) => {
    // event.preventDefault();

    signupUser().then(data => console.log(data))
  }

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
          {(signupUser, { data, loading, error}) => {
            return (
              <form className="form" onSubmit={() => this.handleSubmit(event, signupUser)}>
                <FormInput
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.handleChange}
                />
                <FormInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleChange}
                />
                <FormInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
                <FormInput
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm Password"
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                />
                <button type="submit" className="button-primary">
                  Submit
                </button>
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default SignUp;
