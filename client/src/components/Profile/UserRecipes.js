import React from "react";
import {Link} from 'react-router-dom';
import {Query} from '@apollo/client/react/components';
import classes from './UserRecipe.module.scss';

import {GET_USER_RECIPES} from '../../queries';

const UserRecipes = ({ creator }) => (
  <Query query={GET_USER_RECIPES} variables={{creator}}>
  {({loading, error, data}) => {
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error</p>
    console.log(data)
    return (
      <div className={classes.userrecipe}>
        <h3>Your Recipes</h3>
        <ul>
          {data.getUserRecipes.map(recipe => (
            <li key={recipe._id}>
              <Link to={`/recipe/${recipe._id}`}><h5>{recipe.name}</h5></Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }}
  </Query>
)
export default UserRecipes;
