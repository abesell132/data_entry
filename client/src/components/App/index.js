import React, { Component } from "react";
import ActionsContainer from "../../layouts/ActionsContainer/ActionsContainer";
import VariblesContainer from "../../layouts/VariablesContainer/VariablesContainer";
import { clearCurrentScript, getScript } from "../../redux/actions/scriptActions";
import "./Script.scss";
import { connect } from "react-redux";

class App extends Component {
  constructor() {
    super();
    this.state = {
      scriptID: "",
    };
  }
  componentDidMount() {
    this.props.getScript(this.props.match.params.id);
    this.setState({
      scriptID: this.props.match.params.id,
    });
  }
  componentWillUnmount() {
    console.log("Clearing Current Script");
    this.props.clearCurrentScript();
  }
  render() {
    return (
      <div className="AppPage">
        <VariblesContainer />
        <ActionsContainer id={this.props.match.params.id} />
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
  clearCurrentScript,
  getScript,
})(App);
