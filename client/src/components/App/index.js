import React, { Component } from "react";
import ActionsContainer from "../ActionsContainer/ActionsContainer";
import VariblesContainer from "../VariablesContainer/VariablesContainer";
import { clearCurrentScript, findOneScript } from "../../redux/actions/scriptActions";
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
    this.props.findOneScript(this.props.match.params.id);
    this.setState({
      scriptID: this.props.match.params.id,
    });
  }
  componentWillUnmount() {
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
  findOneScript,
})(App);
