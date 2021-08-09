import React from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "@apollo/client/react/components";

import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButton/CustomButton.component";
import Error from "../Error";

import { ADD_RECIPE, GET_ALL_RECIPES } from "../../queries";

const initialState = {
  name: "",
  instructions: "",
  category: "Breakfast",
  imageUrl: "",
  description: "",
  creator: "",
};

class AddRecipe extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  componentDidMount() {
    this.setState({ creator: this.props.session.getCurrentUser._id });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(({ data }) => {
      console.log(data);
      this.clearState();
      this.props.history.push("/");
    });
  };

  updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
    // console.log("get query ", getAllRecipes);
    // console.log("from cache ", addRecipe);

    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes],
      },
    });
  };

  validateForm = () => {
    const { name, description, instructions } = this.state;

    const isValid = !name || !description || !instructions;
    return isValid;
  };

  render() {
    const { name, category, description, imageUrl, instructions, creator } =
      this.state;
      // console.log('this state ', this.state)

    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{
          name,
          category,
          description,
          imageUrl,
          instructions,
          creator,
        }}
        update={this.updateCache}
      >
        {(addRecipe, { data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Errpr!</p>;
          {/* console.log('Add recpee data ', data); */}

          return (
            <div className="App">
              <h2 className="App">Add Recipe</h2>
              <form
                className="form"
                onSubmit={(event) => this.handleSubmit(event, addRecipe)}
              >
                <FormInput
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  placeholder="Recipe Name"
                />
                <select name="category" onChange={this.handleChange}>
                  <option value="Breakfest">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <FormInput
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  placeholder="Description"
                />
                <FormInput
                  type="text"
                  name="imageUrl"
                  // value={imageUrl}
                  placeholder="Add Image"
                  onChange={this.handleChange}
                />
                {/* <FormInput
                  type="file"
                  name="imageUrl"
                  // value={imageUrl}
                  placeholder="Add Image"
                  onChange={this.handleChange}
                  accept=".psd, .tif, .tiff"
                /> */}
                <textarea
                  name="instructions"
                  value={instructions}
                  placeholder="Add instructions"
                  onChange={this.handleChange}
                ></textarea>
                <CustomButton
                  type="submit"
                  disabled={loading || this.validateForm()}
                  className="button-primery"
                >
                  Submit
                </CustomButton>
                {error && <Error error={error.message} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(AddRecipe);
