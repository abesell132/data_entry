import React, { Component } from "react";
import { setPopupType, closePopup } from "../../redux/actions/appStateActions";
import { executeCommands } from "../../redux/actions/commandActions";
import { saveScript, executeScript } from "../../redux/actions/scriptActions";
import Plus from "../../assets/imgs/plus.png";
import "./index.scss";
import { connect } from "react-redux";

class ActionsContainer extends Component {
  constructor() {
    super();
    this.openPopup = this.openPopup.bind(this);
    this.executeCommands = this.executeCommands.bind(this);
    this.saveScript = this.saveScript.bind(this);
  }
  openPopup() {
    this.props.setPopupType("COMMAND_SELECT");
  }
  saveScript() {
    this.props.saveScript(this.props.scripts, this.props.id);
  }
  executeCommands() {
    this.props.saveScript(this.props.scripts, this.props.id);
    this.props.executeScript(this.props.id);
  }
  render() {
    return (
      <div className="actions">
        <div id="action-controls">
          <button id="execute-script" onClick={this.executeCommands}>
            Execute
          </button>
          <button id="save-script" className="green" onClick={this.saveScript}>
            Save
          </button>
        </div>
        <div className="actions-list">
          {this.props.scripts.list.map((Element, key) => (
            <div key={key}>{Element}</div>
          ))}
        </div>
        <div id="add-action" onClick={this.openPopup}>
          <img src={Plus} style={{ width: "100%" }} alt="Add Command" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appState: state.appState,
  commands: state.commands,
  scripts: state.scripts,
});

export default connect(mapStateToProps, {
  executeCommands,
  setPopupType,
  closePopup,
  executeScript,
  saveScript,
})(ActionsContainer);
