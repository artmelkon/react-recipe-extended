import React from "react";
import { Query } from "@apollo/client/react/components";

import { GET_ALL_RECIPES } from "../queries/index";
import RecipeItem from './Recipe/RecipeItem';
import classes from "./App.module.scss";

const App = () => (
  <div className={classes.App}>
    <h1>Home</h1>
    <Query query={GET_ALL_RECIPES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error!</div>;
        {/* console.log(data); */}
        return (
          <ul>
            {data.getAllRecipes.map((recipe) => (
              <RecipeItem key={recipe._id} {...recipe} />
            ))}
          </ul>
        );
      }}
    </Query>
  </div>
);

export default App;
