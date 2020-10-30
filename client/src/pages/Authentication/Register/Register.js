import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../../redux/actions/authActions";
import { withRouter } from "react-router-dom";
import "../Register.scss";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.registerUser(this.state, this.props.history);
  }
  render() {
    return (
      <div id="auth">
        <div id="form-container">
          <div>
            <div id="auth-page-controls">
              <h2 className="active">Register</h2>
              <h2>
                <Link to="/login">Log In</Link>
              </h2>
            </div>
            <form onSubmit={this.onSubmit}>
              <input type="text" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
              <input type="text" name="email" value={this.state.email} onChange={this.onChange} placeholder="Email Address" />
              <input type="text" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" />
              <input type="text" name="password2" value={this.state.password2} onChange={this.onChange} placeholder="Confirm Password" />
              <input type="submit" value="Sign Up" />
              <div id="privacy-policy">Privacy Policy</div>
            </form>
          </div>
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
  registerUser,
})(withRouter(Register));
