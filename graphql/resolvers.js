const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const User = require('../models/user');
require("dotenv").config({ path: "./env/.env" });

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};
exports.resolvers = {
  RootQuery: {
    getUsers: async (toot, args, { User }, info) => {
      const allUsers = await User.find();
      return allUsers;
    },
    getAllRecipes: async (root, args, { Recipe }, info) => {
      const allRecipes = await Recipe.find();
      // return { ...allRecipes._doc, _id: allRecipes._id.toString() }
      return allRecipes;
    },
  },
  RootMutation: {
    addRecipe: async (
      root,
      { name, description, category, instructions, username },
      { Recipe }
    ) => {
      const newRecipe = await new Recipe({
        name,
        description,
        category,
        instructions,
        username,
      }).save();

      return newRecipe;
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const userExists = await User.findOne({ username });
      if (userExists) throw new Error("User already exists");

      const user = await new User({
        username,
        email,
        password,
      });
      user.password = await bcrypt.hash(user.password, 10);

      user.save();

      return { token: createToken(user, process.env.JWT_SECRET, "1hr") };
    },

    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error("User not found!");

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new Error("Invalid Password");

      return { token: createToken(user, process.env.JWT_SECRET, "1hr") };
    },
  },
};
