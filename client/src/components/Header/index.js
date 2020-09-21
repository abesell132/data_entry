import React, { Component } from "react";
import "./Header.scss";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    return (
      <header>
        <div class="container">Header</div>
      </header>
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
})(Header);
