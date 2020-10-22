import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "../../../redux/actions/authActions";
import "../Register.scss";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.auth.isAuthenticated || nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.loginUser(this.state);
  }
  render() {
    return (
      <div id="auth">
        <div id="form-container">
          <div>
            <div id="auth-page-controls">
              <h2>
                <Link to="/register">Register</Link>
              </h2>
              <h2 className="active">Log In</h2>
            </div>
            <form onSubmit={this.onSubmit}>
              <input type="text" name="email" value={this.state.email} onChange={this.onChange} placeholder="Email Address" />
              <input type="text" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" />
              <div id="forgot-password">Forgot Password?</div>
              <input type="submit" value="Log In" />
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
  loginUser,
})(withRouter(Login));
