import React  from 'react';


const RecipeItem = ({ _id, name, category }) => (
  <li>
    <h4>{name}</h4>
    <p>
      <strong>{category.replace(/\b\w/g, (l) => l.toUpperCase())}</strong>
    </p>
  </li>
);

export default RecipeItem;
