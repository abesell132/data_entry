import React, { Component } from "react";
import { connect } from "react-redux";
import "./Popup.scss";
import CommandSelect from "./popups/CommandSelect";
import NewScript from "./popups/NewScript";
import VaribleDisplay from "./popups/VariableDisplay";
import VariableUpload from "./popups/VariableUpload";
import ExecuteCommands from "./popups/ExecuteCommands";

class Popup extends Component {
  render() {
    switch (this.props.appState.popup_type) {
      case "NONE":
        return <div style={{ display: "none" }} />;
      case "COMMAND_SELECT":
        return <CommandSelect />;
      case "NEW_SCRIPT":
        return <NewScript />;
      case "VARIABLE":
        return <VaribleDisplay />;
      case "VARIABLE_UPLOAD":
        return <VariableUpload />;
      case "EXECUTE_COMMANDS":
        return <ExecuteCommands />;
      default:
        return <div style={{ display: "none" }} />;
    }
  }
}

const mapStateToProps = (state) => ({
  appState: state.appState,
});

export default connect(mapStateToProps, {})(Popup);
