import React from "react";
import { ApolloConsumer } from "@apollo/client";
import { Link } from "react-router-dom";

import FormInput from "../FormInput/FormInput.component";
import { SEARCH_RECIPES } from "../../queries";

class Search extends React.Component {
  handleChange = (data) => {
    console.log(data);
  };

  render() {
    return (
      <ApolloConsumer>
        {(client) => (
          <div className="App">
            <FormInput
              type="search"
              onChange={async (event) => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_RECIPES,
                  variables: { searchTerm: event.target.value },
                });
                this.handleChange(data);
              }}
              placeholder="Search for recipoes"
            />
            <ul>
              {[].map((recipe) => (
                <li key={recipe._id}>
                  <Link to={`/recipes/${recipe._id}`}>
                    <h4>{recipe.name}</h4>
                  </Link>
                  <p>{recipe.likes}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
