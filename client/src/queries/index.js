import { gql } from "apollo-boost";

/* Recipes Queries */
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
    }
  }
`;

export const GET_CURRENT_USER = gql `
  query {
    getCurrentUser {
      username
      email
      joinDate
    }
  }
`;

/* Recipes Mutation */

/* User Query */
/* User Mutation */
export const SIGNUP_USER = gql`
  mutation SignupUser($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SigninUser($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
