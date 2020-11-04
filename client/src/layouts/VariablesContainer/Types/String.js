import React, { Component } from "react";
import { connect } from "react-redux";
import { updateVariable, deleteVariable } from "../../../redux/actions/scriptActions";

import StringIcon from "../../../assets/imgs/StringIcon.png";
import GarbageCan from "../../../assets/imgs/garbage-can.png";

import "../index.scss";

class String extends Component {
  constructor() {
    super();
    this.state = {
      showSettings: false,
    };
    this.toggleSettings = this.toggleSettings.bind(this);
    this.deleteVariable = this.deleteVariable.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toggleSettings() {
    this.setState(
      {
        showSettings: !this.state.showSettings,
      },
      () => {
        if (!this.state.showSettings) {
          let newVar = {
            id: this.props.element.id,
            name: this.state.name !== undefined ? this.state.name : this.props.element.name,
            value: this.state.value !== undefined ? this.state.value : this.props.element.value,
            type: this.props.element.type,
          };
          this.props.updateVariable(newVar);
        }
      }
    );
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  deleteVariable(e) {
    e.stopPropagation();
    this.props.deleteVariable(this.props.element);
  }

  render() {
    let display = this.state.showSettings ? "block" : "none";
    return (
      <div className={`VariableWrapper ${this.state.showSettings ? "settings-open" : ""}`}>
        <div className="variable" onClick={() => this.toggleSettings()}>
          <div className="variable-meta">
            <div className={`file-type ${this.props.element.type}`}>
              <img src={StringIcon} alt="Decoration" /> {/*Change This*/}
            </div>
            <div className="file-name">
              <h4>String</h4> {/*Change This*/}
              <span>{this.state.name !== undefined && this.state.name !== "" ? this.state.name : this.props.element.name}</span>
            </div>
          </div>
          <div className="delete-variable">
            <img src={GarbageCan} onClick={this.deleteVariable} alt="Delete Variable" />
          </div>
        </div>
        <div className="settings" onClick={this.stopProp} style={{ display }}>
          <label>Name</label>
          <input type="text" name="name" value={this.state.name !== undefined ? this.state.name : this.props.element.name} onChange={this.onChange} />
          <label>Value</label>
          <input type="text" name="value" value={this.state.value !== undefined ? this.state.value : this.props.element.value} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  script: state.script,
});

export default connect(mapStateToProps, { updateVariable, deleteVariable })(String);
