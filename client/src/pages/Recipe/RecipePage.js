import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "@apollo/client/react/components";

import classes from './Recipe.module.scss';
import { GET_RECIPE } from "../../queries";

const RecipePage = ({ match }) => {
  const { id } = match.params;
  console.log(id);
  return <Query query={GET_RECIPE} variables={{ _id: id }}>{({ data, loading, error }) => {
    if(loading) return <p>Losding...</p>;
    if(error) return <p>Error</p>;
    console.log(data)
    return(
      <div className={classes.recipe}>
      <h2>{data.getRecipe.name}</h2>
      <p>Category: {data.getRecipe.category}</p>
      <p>Description: {data.getRecipe.description}</p>
      <p>Instructions: {data.getRecipe.instructions}</p>
      <p>Likes: {data.getRecipe.likes}</p>
      <p>Created by: {data.getRecipe.creator.username}</p>
      <button>Like</button>
    </div>
    )
  }}</Query>;
};

export default withRouter(RecipePage);
