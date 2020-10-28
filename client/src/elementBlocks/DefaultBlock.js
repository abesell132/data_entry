import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteCommand, updateCommand } from "../redux/actions/commandActions";
import GarbageCan from "./../assets/imgs/garbage-can.png";
import "./CommandBlock.scss";

class DefaultBlock extends Component {
  constructor() {
    super();
    this.state = {
      showSettings: false,
    };
    this.toggleSettings = this.toggleSettings.bind(this);
    this.stopProp = this.stopProp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteBlock = this.deleteBlock.bind(this);
  }

  componentDidMount() {}
  toggleSettings() {
    this.setState({
      showSettings: !this.state.showSettings,
    });
  }
  stopProp(e) {
    e.stopPropagation();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.props.updateCommand(this.props.id, this.props.scripts.list, this.props.scripts.json, e.target.name, e.target.value);
  }
  deleteBlock(e) {
    e.stopPropagation();
    this.props.deleteCommand(this.props.id, this.props.scripts.list, this.props.scripts.json);
  }
  render() {
    let display = this.state.showSettings ? "block" : "none";
    return (
      <div className="action" onClick={this.toggleSettings}>
        <div className="controls">
          <div className="name">{this.props.name}</div>
          <div>
            <img src={GarbageCan} className="delete-command" onClick={this.deleteBlock} alt="Delete Block" />
          </div>
        </div>
        <div className="settings" onClick={this.stopProp} style={{ display }}>
          {this.props.fields.map((field, index) => (
            <div key={index}>
              {field.label ? <label htmlFor={field.slug}>{field.label}</label> : ""}
              {field.inputType ? <input type={field.type} name={field.slug} value={this.state[field.slug] ? this.state[field.slug] : field.value} onChange={this.onChange} /> : ""}
            </div>
          ))}
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

const mapDispatchToProps = (dispatch) => ({
  deleteCommand: (id, commandsList, commandJSON) => dispatch(deleteCommand(id, commandsList, commandJSON)),
  updateCommand: (id, commandsList, commandJSON, field, value) => dispatch(updateCommand(id, commandsList, commandJSON, field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultBlock);
