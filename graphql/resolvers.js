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
    getUsers: async (root, args, { User }, info) => {
      const allUsers = await User.find();
      return allUsers;
    },
    getAllRecipes: async (root, args, { Recipe }, info) => {
      const allRecipes = await Recipe.find().sort({ createdDate: "desc" });
      // return { ...allRecipes._doc, _id: allRecipes._id.toString() }
      return allRecipes;
    },
    getRecipe: async (root, { _id }, { Recipe, User }) => {
      const recipe = await Recipe.findById(_id).populate("creator");
      console.log(recipe);
      return recipe;
    },
    searchRecipes: async (root, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        const searchResults = await Recipe.find(
          {
            $text: { $search: searchTerm },
          },
          {
            score: { $meta: "textScore" },
          }
        ).sort({ score: { $meta: "textScore" } });
        return searchResults;
      } else {
        const recipes = await Recipe.find().sort({
          like: "desc",
          createdDate: "desc",
        });
        return recipes;
      }
    },
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) return null;

      const user = await User.findOne({
        username: currentUser.username,
      }).populate({
        path: "favorites",
        model: "Recipe",
      });
      console.log('user ', user);
      return user;
    },
    getUserRecipes: async (root, { creator }, { Recipe }) => {
      const userRecipes = await Recipe.find({ creator }).sort({createdDate: -1});
      return userRecipes;
    },
  },
  RootMutation: {
    addRecipe: async (
      root,
      { name, description, category, imageUrl, instructions, creator },
      { Recipe, User }
    ) => {
      const user = await User.findOne({_id: creator})
      console.log(user.username)
      const newRecipe = new Recipe({
        name,
        description,
        category,
        instructions,
        imageUrl,
        creator: user,
      });
      await newRecipe.save();

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

      return {
        token: createToken(user, process.env.JWT_SECRET, "1h"),
        userId: user.id,
      };
    },

    signinUser: async (root, { email, password }, { User }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found!");

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new Error("Invalid Password");

      return {
        token: createToken(user, process.env.JWT_SECRET, "1h"),
        userId: user._id.toString(),
      };
    },
  },
};
