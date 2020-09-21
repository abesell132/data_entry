import React, { Component } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    return (
      <header>
        <div class="header-container">
          <div class="logo">
            <Link to="/">Food Roulette</Link>
          </div>
          <ul id="header-menu">
            <li>Your Restaurant</li>
            <li>Advertisements</li>
            <li>Log In</li>
            <li>Sign Up</li>
          </ul>
        </div>
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
