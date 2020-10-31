import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteCommand, updateCommand } from "../redux/actions/commandActions";
import GarbageCan from "./../assets/imgs/garbage-can.png";
import Warning from "./../assets/imgs/warning.png";
import "./CommandBlock.scss";
import validateDefaultBlockFields from "../validation/DefaultBlock";

class DefaultBlock extends Component {
  constructor() {
    super();
    this.state = {
      showSettings: false,
      errors: {},
      saved: true,
    };
    this.toggleSettings = this.toggleSettings.bind(this);
    this.stopProp = this.stopProp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteBlock = this.deleteBlock.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  saveSettings(toggle = false) {
    validateDefaultBlockFields(this.props.fields, this.state)
      .then((values) => {
        Object.keys(values).map((key) => {
          this.props.updateCommand(this.props.id, this.props.script.list, this.props.script.json, key, values[key]);
          return 1;
        });
        this.setState({ errors: {}, saved: true });
        if (toggle) {
          this.setState({ showSettings: !this.state.showSettings });
        }
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  }
  toggleSettings() {
    if (this.state.showSettings) {
      this.saveSettings(true);
    } else {
      this.setState({ showSettings: !this.state.showSettings });
    }
  }
  stopProp(e) {
    e.stopPropagation();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, saved: false });
  }
  deleteBlock(e) {
    e.stopPropagation();
    this.props.deleteCommand(this.props.id, this.props.script.list, this.props.script.json);
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
            <img src={GarbageCan} className="delete-command" onClick={this.deleteBlock} alt="Delete Block" />
          </div>
        </div>
        <div className="settings" onClick={this.stopProp} style={{ display }}>
          {this.props.fields.map((field, index) => (
            <div key={index}>
              {field.label ? <label htmlFor={field.slug}>{field.label}</label> : ""}
              {field.slug in this.state.errors ? <div class="field-error">{this.state.errors[field.slug]}</div> : ""}
              {field.inputType ? <input type={field.type} name={field.slug} value={this.state[field.slug] ? this.state[field.slug] : field.value} onChange={this.onChange} /> : ""}
            </div>
          ))}
          <button className="save-link" onClick={() => this.saveSettings()}>
            Save
          </button>
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

const mapDispatchToProps = (dispatch) => ({
  deleteCommand: (id, commandsList, commandJSON) => dispatch(deleteCommand(id, commandsList, commandJSON)),
  updateCommand: (id, commandsList, commandJSON, field, value) => dispatch(updateCommand(id, commandsList, commandJSON, field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultBlock);
