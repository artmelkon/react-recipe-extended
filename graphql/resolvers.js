// const { Token } = require('graphql');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: './env/.env'});

const createToken = (user, secret, expiresIn) => {

  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn })
}
exports.resolvers = {
  RootQuery: {
    getAllRecipes: async (root, args, { Recipe }, info) => {
      const allRecipes = await Recipe.find();
      // return { ...allRecipes._doc, _id: allRecipes._id.toString() }
      return allRecipes;
    }
  },
  RootMutation: {
    addRecipe: async (root, { name, description, category, instructions, username }, { Recipe }) => {
      const newRecipe = await new Recipe({
        name,
        description,
        category,
        instructions,
        username
      }).save();

      return newRecipe;
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({username});
      if(user) throw new Error('User already exists');

      const newUser = await new User({
        username,
        email,
        password
      }).save();
      
      return { token: createToken(newUser, process.env.TOKEN_SECRET, "1hr")};
    }
  }
  
};