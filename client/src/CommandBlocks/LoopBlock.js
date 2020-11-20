import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateCommandList,
  updateCommand,
} from "../redux/actions/commandActions";
import { setPopupType, setPopupData } from "../redux/actions/appStateActions";

import DynamicFill from "../components/DynamicFill/DynamicFill";
import ActionList from "../components/ActionList/ActionList";

import GarbageCan from "./../assets/imgs/garbage-can.png";
import PlusIcon from "./../assets/imgs/plus.png";
import Warning from "./../assets/imgs/warning.png";
import "./CommandBlock.scss";
import "./LoopBlock.scss";

const getDefaultAccepts = (name) => {
  switch (name) {
    case "Load URL":
      return ["string", "number"];
    default:
      return [];
  }
};

class LoopBlock extends Component {
  constructor() {
    super();
    this.state = {
      showSettings: false,
      showDynamic: false,
      errors: {},
      saved: true,
    };
    this.toggleSettings = this.toggleSettings.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteBlock = this.deleteBlock.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.setDynamic = this.setDynamic.bind(this);
    this.addCommand = this.addCommand.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, saved: false });
  }
  deleteBlock(e) {
    e.stopPropagation();
    this.props.deleteBlock(this.props.index);
  }
  saveSettings() {
    return new Promise((resolve, reject) => {
      this.props.updateCommand(
        this.props.blockContext,
        "array",
        this.state.array ? this.state.array.split(",") : this.props.array
      );
      this.props.updateCommand(
        this.props.blockContext,
        "commands",
        this.props.commands
      );
      resolve();
    });
  }
  toggleSettings() {
    this.setState({ showSettings: !this.state.showSettings }, () => {
      if (!this.state.showSettings) {
        this.saveSettings().then(() => {
          this.setState({ saved: true });
        });
      }
    });
  }

  setDynamic(index, field, value) {
    let oldState = this.state[field.slug]
      ? this.state[field.slug]
      : this.props.fields[index].value;
    this.setState({
      [field.slug]: oldState + value,
      saved: false,
    });
  }

  addCommand() {
    let commands = this.props.commands;
    this.props.setPopupType("COMMAND_SELECT");
    this.props.setPopupData({
      context: this.props.blockContext + ".commands",
      contextCommands: commands,
    });
  }

  render() {
    let display = this.state.showSettings ? "block" : "none";
    return (
      <div className="action" onClick={this.toggleSettings}>
        <div className="controls">
          <div className="name">{this.props.name}</div>
          <div>
            {this.state.saved ? (
              ""
            ) : (
              <span className="not-saved">
                <img src={Warning} alt="Not Saved" />
              </span>
            )}
            <img
              src={GarbageCan}
              className="delete-command"
              onClick={this.deleteBlock}
              alt="Delete Block"
            />
          </div>
        </div>
        <div
          className="settings"
          onClick={(e) => e.stopPropagation()}
          style={{ display }}
        >
          {this.props.fields.map((field, index) => (
            <div key={index}>
              {field.label ? (
                <label htmlFor={field.slug}>{field.label}</label>
              ) : (
                ""
              )}
              {field.slug in this.state.errors ? (
                <div className="field-error">
                  {this.state.errors[field.slug]}
                </div>
              ) : (
                ""
              )}

              <div className="dynamic-fill">
                {field.inputType ? (
                  <input
                    type={field.inputType}
                    name={field.slug}
                    value={
                      this.state[field.slug]
                        ? this.state[field.slug]
                        : this.props.array.join()
                    }
                    onChange={this.onChange}
                  />
                ) : (
                  ""
                )}
                <DynamicFill
                  field={field}
                  index={index}
                  context={this.props.blockContext}
                  setDynamic={this.setDynamic}
                  accepts={getDefaultAccepts(this.props.name)}
                />
              </div>
            </div>
          ))}
          <label>Commands</label>
          <div className="loop-commands">
            <ActionList
              mapItems={this.props.commands}
              droppableId={"droppable-asdf"}
              listContext={this.props.blockContext + ".commands"}
            />
          </div>
          <div className="add-command" onClick={this.addCommand}>
            <img src={PlusIcon} width="24" alt="Add Command" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appState: state.appState,
  script: state.script,
});

const mapDispatchToProps = (dispatch) => ({
  updateCommandList: (id) => dispatch(updateCommandList(id)),
  updateCommand: (blockContext, field, value) =>
    dispatch(updateCommand(blockContext, field, value)),
  setPopupType: (type) => dispatch(setPopupType(type)),
  setPopupData: (data) => dispatch(setPopupData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoopBlock);
