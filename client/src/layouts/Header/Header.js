import React, { Component } from "react";
import "./Header.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logUserOut } from "../../redux/actions/authActions";

class Header extends Component {
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.props.logUserOut();
  }

  render() {
    let Authentication = this.props.auth.isAuthenticated ? (
      <div onClick={this.logOut} id="log-out" className="pointer">
        Log Out
      </div>
    ) : (
      <div id="login-register">
        <span>
          <Link to="/login">Log In</Link>
        </span>
        <span>
          <Link to="/login">Register</Link>
        </span>
      </div>
    );
    return (
      <header>
        <div className="container">
          <div className="title">
            <Link to="/">Header Title</Link>
          </div>
          <div className="navigation">
            <span>Pricing</span>
            <span>Documentation</span>
            <span>Support</span>
          </div>
          {Authentication}
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
  logUserOut,
})(Header);
