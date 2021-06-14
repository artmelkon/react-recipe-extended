const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  type Recipe {
    _id: ID!
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
  }

  type Token {
    token: String!
  }

  type RootQuery {
    getUsers: [User!]!
    getAllRecipes: [Recipe]
    signinUser(username: String!, password: String!): Token
  }

  type RootMutation {
    addRecipe(
      name: String!
      description: String!
      category: String
      instructions: String!
      username: String
    ): Recipe
    signupUser(username: String!, email: String!, password: String!): Token
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;
