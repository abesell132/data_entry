import React, { Component } from "react";
import { connect } from "react-redux";
import { closePopup } from "../../../redux/actions/appStateActions";
import { v4 as uuidv4 } from "uuid";
import { addScript, uploadVariable, createNewVariable } from "../../../redux/actions/scriptActions";
import isEmpty from "../../../validation/is-empty";

import File from "./CreateVariableTypes/File";

import ArrayIcon from "../../../assets/imgs/array.png";
import StringIcon from "../../../assets/imgs/StringIcon.png";
import NumberIcon from "../../../assets/imgs/NumberIcon.png";
import FileIcon from "../../../assets/imgs/FileIcon.png";
import FolderIcon from "../../../assets/imgs/FolderIcon.png";
import "./css/VariableUpload.scss";

class CreateVariable extends Component {
  constructor() {
    super();
    this.state = {
      variableType: "",
      scriptname: "",
      error: "",
      file: [],
    };
    this.closePopup = this.closePopup.bind(this);
    this.stopProp = this.stopProp.bind(this);
    this.clearError = this.clearError.bind(this);
    this.addVariable = this.addVariable.bind(this);
  }
  closePopup() {
    this.props.closePopup();
  }
  stopProp(e) {
    e.stopPropagation();
  }
  clearError() {
    this.setState({
      error: "",
    });
  }

  addVariable(type) {
    console.log(type);
    let newVarible = {};
    switch (type) {
      case "string":
        newVarible = { id: uuidv4(), type, name: "New String", value: "" };
        break;
      case "number":
        newVarible = { id: uuidv4(), type, name: "New Number", value: "" };
        break;
      case "array":
        newVarible = { id: uuidv4(), type, name: "New Array", value: [] };
        break;
      case "file":
        this.setState({
          variableType: "file",
        });
        return;
      default:
        break;
    }
    this.props.createNewVariable(newVarible);
    this.props.closePopup();
  }
  render() {
    let content;
    if (!isEmpty(this.state.file)) {
      content = (
        <section>
          <div>
            <h3>Files Uploaded Successfully</h3>
          </div>
        </section>
      );
    } else if (this.state.error !== "") {
      content = (
        <section>
          <div>
            <h3>{this.state.error}</h3>
            <div style={{ textAlign: "center" }} className="pointer" onClick={this.clearError}>
              Go Back
            </div>
          </div>
        </section>
      );
    }
    switch (this.state.variableType) {
      case "file":
        content = <File closePopup={this.closePopup} />;
        break;
      default:
        content = (
          <div className="container">
            <h3>Select Variable Type</h3>
            <div onClick={() => this.addVariable("string")} className="option">
              <img src={StringIcon} alt="String Variable" />
              <div>String</div>
            </div>
            <div onClick={() => this.addVariable("number")} className="option">
              <img src={NumberIcon} alt="Number Variable" />
              <div>Number</div>
            </div>
            <div onClick={() => this.addVariable("array")} className="option">
              <img src={ArrayIcon} alt="Array Variable" />
              <div>Array</div>
            </div>
            <div onClick={() => this.addVariable("file")} className="option">
              <img src={FileIcon} alt="File Variable" />
              <div>File</div>
            </div>
            <div onClick={() => this.addVariable("group")} className="option">
              <img src={FolderIcon} alt="Variable Group" />
              <div>Variable Group</div>
            </div>
          </div>
        );
    }

    return (
      <div id="popup" className="variable-upload" style={{ display: this.props.appState.popup_visible }} onClick={this.closePopup}>
        <div id="popup-container" onClick={this.stopProp}>
          <div id="popup-content" className="var-types">
            {content}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appState: state.appState,
  commands: state.commands,
});

export default connect(mapStateToProps, { closePopup, addScript, uploadVariable, createNewVariable })(CreateVariable);
