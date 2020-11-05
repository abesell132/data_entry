import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteVariable } from "../../../redux/actions/scriptActions";
import { setPopupType, setPopupData } from "../../../redux/actions/appStateActions";

import PNGIcon from "../../../assets/imgs/picture.png";
import JPGIcon from "../../../assets/imgs/JPGIcon.png";
import GarbageCan from "../../../assets/imgs/garbage-can.png";

class Image extends Component {
  constructor() {
    super();
    this.state = {
      showSettings: false,
      name: "",
      value: "",
    };
    this.toggleSettings = this.toggleSettings.bind(this);
    this.openVariable = this.openVariable.bind(this);
    this.deleteVariable = this.deleteVariable.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  openVariable(variable) {
    this.props.setPopupType("VARIABLE");
    this.props.setPopupData(variable);
  }
  toggleSettings() {
    this.setState({
      showSettings: !this.state.showSettings,
    });
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
        <div className="variable" onClick={() => this.openVariable(this.props.element)}>
          <div className="variable-meta">
            <div className="file-type">
              <img src={getVariableImage(this.props.element)} alt="Decoration" />
            </div>
            <div className="file-name">
              <h4>{getVariableType(this.props.element)}</h4>
              <span>{this.state.name === "" ? this.props.element.name : this.state.name}</span>
            </div>
          </div>
          <div className="delete-variable">
            <img src={GarbageCan} onClick={this.deleteVariable} alt="Delete Variable" />
          </div>
        </div>
        <div className="settings" onClick={this.stopProp} style={{ display }}>
          <label>Name</label>
          <input type="text" name="name" value={this.state.name !== "" ? this.state.name : this.props.element.name} onChange={this.onChange} />
          <label>Value</label>
          <input type={this.props.element.type !== "number" ? "text" : "number"} name="value" value={this.state.value !== "" ? this.state.value : this.props.element.value} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  script: state.script,
});

export default connect(mapStateToProps, {
  setPopupType,
  deleteVariable,
  setPopupData,
})(Image);

const getVariableImage = (element) => {
  switch (element.imageType) {
    case "png":
      return PNGIcon;
    case "jpg":
      return JPGIcon;
    case "jpeg":
      return JPGIcon;
    default:
      return PNGIcon;
  }
};
const getVariableType = (element) => {
  switch (element.type) {
    case "image/jpeg":
      return "Image";
    case "image/jpg":
      return "Image";
    case "image/png":
      return "Image";
    default:
      return element.type;
  }
};
