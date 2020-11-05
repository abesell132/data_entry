import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import { connect } from "react-redux";
import { setPopupType, closePopup, setPopupData } from "../../redux/actions/appStateActions";
import { saveScript, executeScript, renameScript } from "../../redux/actions/scriptActions";

import ActionList from "../../components/ActionList/ActionList";
import "./index.scss";

import Plus from "../../assets/imgs/plus.png";
import SavingAnimation from "../../assets/imgs/saving.svg";
import edit from "../../assets/imgs/edit.png";

class ActionsContainer extends Component {
  constructor() {
    super();
    this.state = {
      scriptName: "",
      editScriptName: false,
      saving: false,
      commandErrors: false,
    };
    this.openPopup = this.openPopup.bind(this);
    this.executeCommands = this.executeCommands.bind(this);
    this.saveScript = this.saveScript.bind(this);
    this.toggleEditScriptName = this.toggleEditScriptName.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renameScript = this.renameScript.bind(this);
    this.getCommandBlockErrors = this.getCommandBlockErrors.bind(this);
    this.startSave = this.startSave.bind(this);
  }

  getCommandBlockErrors(errors) {
    if (!isEmpty(errors)) {
      this.setState({ commandErrors: true });
    }
  }
  startSave() {
    this.setState(
      {
        saving: true,
        commandErrors: false,
      },
      () => {
        setTimeout(
          function () {
            this.setState({ saving: false });
          }.bind(this),
          1000
        );
      }
    );
  }

  openPopup() {
    this.props.setPopupType("COMMAND_SELECT");
    this.props.setPopupData({ context: this.props.blockContext, contextCommands: this.props.script.json });
  }
  saveScript() {
    this.startSave();
    setTimeout(() => {
      if (!this.state.commandErrors) {
        this.props.saveScript(
          {
            commands: this.props.script.json,
            variables: this.props.script.variables,
            name: this.props.script.name,
          },
          this.props.script.currentScript
        );
      } else {
        this.props.setPopupType("COMMAND_ERRORS");
      }
    }, 1000);
  }
  executeCommands() {
    this.startSave();
    setTimeout(() => {
      if (!this.state.commandErrors) {
        this.props.saveScript(
          {
            commands: this.props.script.json,
            variables: this.props.script.variables,
            name: this.props.script.name,
          },
          this.props.script.currentScript
        );
        this.props.setPopupType("EXECUTE_COMMANDS");
        this.startSave();
      } else {
        this.props.setPopupType("COMMAND_ERRORS");
      }
    }, 1000);
  }
  toggleEditScriptName() {
    this.setState({
      editScriptName: !this.state.editScriptName,
    });
  }
  renameScript() {
    if (this.state.scriptName !== "") {
      this.props.renameScript(this.state.scriptName, this.props.script.currentScript);
    } else {
      this.props.renameScript(this.props.script.name, this.props.script.currentScript);
    }
    this.toggleEditScriptName();
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    let scriptName;
    if (!this.state.editScriptName) {
      scriptName = (
        <h3>
          {this.props.script.name} <img src={edit} width="14" className="pointer edit-script-name" onClick={this.toggleEditScriptName} alt="Edit Script Pen" />
        </h3>
      );
    } else {
      scriptName = (
        <div className="change-name-form">
          {<input type="text" name="scriptName" value={this.state.scriptName === "" ? this.props.script.name : this.state.scriptName} onChange={this.onChange} />}
          <input type="submit" className="button pointer" value="Done" onClick={this.renameScript} />
        </div>
      );
    }

    return (
      <div className="actions">
        <div id="action-controls">
          <div>{scriptName}</div>
          <div id="script-button-options">
            {this.state.saving ? <img src={SavingAnimation} width="50" class="saving-animation" alt="saving animation" /> : ""}
            <button id="execute-script" onClick={this.executeCommands}>
              Execute
            </button>
            <button id="save-script" className="green" onClick={this.saveScript}>
              Save
            </button>
          </div>
        </div>
        <div className="actions-scrollable">
          <ActionList mapItems={this.props.script.json} droppableId={"droppable-main"} listContext="" />
          <div id="add-action" onClick={this.openPopup}>
            <img src={Plus} style={{ width: "100%" }} alt="Add Command" />
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

export default connect(mapStateToProps, {
  setPopupType,
  closePopup,
  executeScript,
  saveScript,
  setPopupData,
  renameScript,
})(ActionsContainer);
