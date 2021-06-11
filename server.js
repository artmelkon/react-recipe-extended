const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const express = require('express');

const User = require('./models/User');
const Recipe = require('./models/Recipe');

const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');
const { makeExecutableSchema } = require('graphql-tools');

const app = express();

const crosOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// app.use(cors());

// const typeDefs = gql `
//   type Query {
//     hello: String
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: () => 'Hello World'
//   }
// }

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({ schema, context:{ User, Recipe } });
server.applyMiddleware({ app })

// app.use(express.json());
/* create GreaphQL Middleware Application */
/* connect schema with graphql */

/* connecting database */
require('./utils/db_connect')(app)

// const PORT = process.env.PORT || 4444;
// app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));