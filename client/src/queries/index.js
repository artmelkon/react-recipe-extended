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

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      favorites {
        _id
        name
      }
      joinDate
    }
  }
`;

export const GET_USER_RECIPES = gql`
  query GetUserRecipes($creator: String!) {
    getUserRecipes(creator: $creator) {
      _id
      name
      likes
      createdDate
    }
  }
`;
export const GET_RECIPE = gql`
  query GetRecipe($_id: ID!) {
    getRecipe(_id: $_id) {
      name
      category
      description
      instructions
      imageUrl
      creator {
        username
      }
      createdDate
    }
  }
`;

export const SEARCH_RECIPES = gql`
  query SearchRecipe($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      likes
    }
  }
`;

/* Recipes Mutation */
export const ADD_RECIPE = gql`
  mutation AddRecipe(
    $name: String!
    $description: String!
    $category: String
    $imageUrl: String!
    $instructions: String!
    $creator: String!
  ) {
    addRecipe(
      name: $name
      description: $description
      category: $category
      imageUrl: $imageUrl
      instructions: $instructions
      creator: $creator
    ) {
      _id
      name
      description
      category
      imageUrl
      instructions
      creator {
        _id
        username
      }
    }
  }
`;

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
  mutation SigninUser($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
      userId
    }
  }
`;
