import React, { Component } from "react";
import fastFood from "../../assets/imgs/fast-food.png";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "./Home.scss";

class Home extends Component {
  constructor() {
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  handleButtonClick(e) {
    e.preventDefault();
    console.log("Hello World");
    this.props.history.push("/searchResults");
  }
  render() {
    return (
      <div class="home">
        <div class="background-overlay"></div>
        <div class="get-started">
          <img src={fastFood} alt="Fast Food Decoration" />
          <h4>I'm currently in...</h4>
          <FormControl variant="filled">
            <InputLabel id="demo-simple-select-filled-label">City</InputLabel>
            <Select labelId="demo-simple-select-filled-label" id="location-select" value={10}>
              <MenuItem value={10} selected>
                Marquette
              </MenuItem>
              <MenuItem value={20}>Negaunee</MenuItem>
              <MenuItem value={30}>Ishpeming</MenuItem>
            </Select>
          </FormControl>
          <h4>...and in the mood for..</h4>
          <FormControl variant="filled">
            <InputLabel id="demo-simple-select-filled-label">Cuisine</InputLabel>
            <Select labelId="demo-simple-select-filled-label" id="food-type-select">
              <MenuItem aria-label="None" value="" />
              <MenuItem value="1" id="pick-for-me">
                Random
              </MenuItem>
              <MenuItem value="2">Asian</MenuItem>
              <MenuItem value="3">Burgers</MenuItem>
              <MenuItem value="4">Dessert</MenuItem>
              <MenuItem value="5">Mexican</MenuItem>
              <MenuItem value="6">Salad</MenuItem>
              <MenuItem value="7">Seafood</MenuItem>
              <MenuItem value="8">Soup</MenuItem>
              <MenuItem value="9">Pasta</MenuItem>
              <MenuItem value="10">Pizza</MenuItem>
            </Select>
          </FormControl>
          <button onClick={this.handleButtonClick}>Show Me My Options</button>
        </div>
      </div>
    );
  }
}

// Dump Redux Store Into {this.props} Object
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  //    Redux Action Declations Go Here
})(withRouter(Home));
