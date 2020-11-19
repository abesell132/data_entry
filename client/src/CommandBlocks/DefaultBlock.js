import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteCommand, updateCommand } from "../redux/actions/commandActions";

import DynamicFill from "../components/DynamicFill/DynamicFill";
import validateDefaultBlockFields from "../validation/DefaultBlock";

import GarbageCan from "./../assets/imgs/garbage-can.png";
import Warning from "./../assets/imgs/warning.png";
import "./CommandBlock.scss";

const getDefaultAccepts = (name) => {
  switch (name) {
    case "Load URL":
      return ["string", "number"];
    default:
      return [];
  }
};

class DefaultBlock extends Component {
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
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, saved: false });
  }
  deleteBlock(e) {
    e.stopPropagation();
    this.props.deleteBlock(this.props.index);
    // this.props.deleteCommand(this.props.index);
  }
  saveSettings() {
    return new Promise((resolve, reject) => {
      validateDefaultBlockFields(this.props.fields, this.state)
        .then((values) => {
          Object.keys(values).map((key, index) => {
            this.props.updateCommand(
              this.props.blockContext + "." + this.props.index,
              key,
              values[key]
            );
            return 1;
          });
          this.setState({ errors: {}, saved: true });
          resolve();
        })
        .catch((errors) => {
          this.setState({ errors });
          reject(errors);
        });
    });
  }
  toggleSettings() {
    this.setState({ showSettings: !this.state.showSettings }, () => {
      if (!this.state.showSettings) {
        this.saveSettings();
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
                        : field.value
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
  deleteCommand: (id) => dispatch(deleteCommand(id)),
  updateCommand: (blockContext, field, value) =>
    dispatch(updateCommand(blockContext, field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultBlock);
