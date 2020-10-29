import React, { Component } from "react";
import { connect } from "react-redux";
import { closePopup } from "../../../redux/actions/appStateActions";
import { addScript, uploadVariable, executeScript } from "../../../redux/actions/scriptActions";
import exclamationMark from "../../../assets/imgs/exclamation-mark.png";
import ExecutingAnimation from "../../../assets/imgs/executing.svg";
import "./css/ExecuteCommands.scss";

class ExecuteCommands extends Component {
  constructor() {
    super();
    this.state = {
      confirmed: false,
    };
    this.closePopup = this.closePopup.bind(this);
    this.stopProp = this.stopProp.bind(this);
    this.executeScript = this.executeScript.bind(this);
  }
  closePopup() {
    if (!this.state.confirmed) {
      this.props.closePopup();
    }
  }
  stopProp(e) {
    e.stopPropagation();
  }
  executeScript() {
    this.setState({
      confirmed: true,
    });
    this.props.executeScript(this.props.script.currentScript);
  }

  render() {
    let content;
    if (!this.state.confirmed) {
      content = (
        <div>
          <img src={exclamationMark} alt="File Upload Graphic" width="100" />
          <h3>Confirm Script Execution</h3>
          <div>Please ensure that you are not sending any compromising information, we cannot be held liable for lost or stolen data.</div>
          <button onClick={this.executeScript}>Confirm</button>
        </div>
      );
    } else {
      content = (
        <div>
          <img src={ExecutingAnimation} alt="Loading Animation" />
          <h3>Executing Script</h3>
          <div>This popup will close automatically when the script has finished executing.</div>
        </div>
      );
    }
    return (
      <div id="popup" className="execute-confirm" style={{ display: this.props.appState.popup_visible }} onClick={this.closePopup}>
        <div id="popup-container" onClick={this.stopProp}>
          <div id="popup-content">
            <section>{content}</section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appState: state.appState,
  commands: state.commands,
  script: state.script,
});

export default connect(mapStateToProps, { closePopup, addScript, uploadVariable, executeScript })(ExecuteCommands);
