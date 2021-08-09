import React from "react";
import {Link} from 'react-router-dom';
import {Query} from '@apollo/client/react/components';

import {GET_USER_RECIPES} from '../../queries';

const UserRecipes = ({ username }) => (
  <Query query={GET_USER_RECIPES} variables={{username}}>
  {({loading, error, data}) => {
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error</p>
    console.log(data)
    return (
      <div>
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
