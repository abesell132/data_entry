import React, { Component } from "react";
import "./Home.scss";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return <div class="Home">Home</div>;
  }
}

// Dump Redux Store Into {this.props} Object
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  //    Redux Action Declations Go Here
})(Home);
