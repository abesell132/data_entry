import React, { Component } from "react";
import { setPopupType, closePopup } from "../../redux/actions/appStateActions";
import { addCommand, executeCommands } from "../../redux/actions/commandActions";
import Plus from "../../assets/imgs/plus.png";
import "./index.scss";
import { connect } from "react-redux";

class ActionsContainer extends Component {
  constructor() {
    super();
    this.openPopup = this.openPopup.bind(this);
    this.executeCommands = this.executeCommands.bind(this);
  }
  openPopup() {
    this.props.setPopupType("COMMAND_SELECT");
  }
  executeCommands() {
    this.props.executeCommands(this.props.commands.json);
  }
  render() {
    return (
      <div className="actions">
        <div id="action-controls">
          <button id="execute-script" onClick={this.executeCommands}>
            Execute
          </button>
          <button id="save-script" className="green">
            Save
          </button>
        </div>
        <div className="actions-list">
          {this.props.commands.list.map((Element, key) => (
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
});

export default connect(mapStateToProps, {
  addCommand,
  executeCommands,
  setPopupType,
  closePopup,
})(ActionsContainer);
