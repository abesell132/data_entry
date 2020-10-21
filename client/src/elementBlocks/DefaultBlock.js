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
    this.props.updateCommand(this.props.id, this.props.commands.list, this.props.commands.json, e.target.name, e.target.value);
  }
  deleteBlock(e) {
    e.stopPropagation();
    this.props.deleteCommand(this.props.id, this.props.commands.list, this.props.commands.json);
  }
  render() {
    let display = this.state.showSettings ? "block" : "none";
    return (
      <div class="action" onClick={this.toggleSettings}>
        <div class="controls">
          <div className="name">{this.props.name}</div>
          <div>
            <img src={GarbageCan} className="delete-command" onClick={this.deleteBlock} alt="Delete Block" />
          </div>
        </div>
        <div class="settings" onClick={this.stopProp} style={{ display }}>
          {this.props.fields.map((field, index) => (
            <div>
              <label for={field.slug}>{field.label}</label>
              <input type={field.type} name={field.slug} value={this.state[field.slug]} onChange={this.onChange} />
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
});

const mapDispatchToProps = (dispatch) => ({
  deleteCommand: (id, commandsList, commandJSON) => dispatch(deleteCommand(id, commandsList, commandJSON)),
  updateCommand: (id, commandsList, commandJSON, field, value) => dispatch(updateCommand(id, commandsList, commandJSON, field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultBlock);
