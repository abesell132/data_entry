import React, { Component } from "react";
import { connect } from "react-redux";
import { closePopup } from "../../../redux/actions/appStateActions";
import { addScript, uploadVariable } from "../../../redux/actions/scriptActions";
import isEmpty from "../../../validation/is-empty";

import String from "./CreateVariableTypes/String";
import File from "./CreateVariableTypes/File";
import Array from "./CreateVariableTypes/Array";
import Group from "./CreateVariableTypes/Group";
import Number from "./CreateVariableTypes/Number";

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
    this.onFileUpload = this.onFileUpload.bind(this);
    this.clearError = this.clearError.bind(this);
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
  onFileUpload(files) {
    files.forEach((file) => {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        this.setState({
          error: "Upload is not .png or .jpg file!",
        });
      } else {
        this.setState({
          file: files,
        });
        this.props.uploadVariable(file);
      }
    });
  }
  setVariableType(type) {
    this.setState({
      variableType: type,
    });
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
      case "string":
        content = (
          <div id="popup-content">
            <String />
            <div className="goBack pointer" onClick={() => this.setVariableType("")}>
              Go Back
            </div>
          </div>
        );
        break;
      case "number":
        content = (
          <div id="popup-content">
            <Number />
            <div className="goBack pointer" onClick={() => this.setVariableType("")}>
              Go Back
            </div>
          </div>
        );
        break;
      case "array":
        content = (
          <div id="popup-content" className="file">
            <Array />
            <div className="goBack pointer" onClick={() => this.setVariableType("")}>
              Go Back
            </div>
          </div>
        );
        break;
      case "file":
        content = (
          <div id="popup-content" className="file">
            <File />
            <div className="goBack pointer" onClick={() => this.setVariableType("")}>
              Go Back
            </div>
          </div>
        );
        break;
      case "group":
        content = (
          <div id="popup-content" className="file">
            <Group />
            <div className="goBack pointer" onClick={() => this.setVariableType("")}>
              Go Back
            </div>
          </div>
        );
        break;
      default:
        content = (
          <div id="popup-content" className="var-types">
            <div className="container">
              <h3>Select Variable Type</h3>
              <div onClick={() => this.setVariableType("string")} className="option">
                <img src={StringIcon} alt="String Variable" />
                <div>String</div>
              </div>
              <div onClick={() => this.setVariableType("number")} className="option">
                <img src={NumberIcon} alt="Number Variable" />
                <div>Number</div>
              </div>
              <div onClick={() => this.setVariableType("array")} className="option">
                <img src={ArrayIcon} alt="Array Variable" />
                <div>Array</div>
              </div>
              <div onClick={() => this.setVariableType("file")} className="option">
                <img src={FileIcon} alt="File Variable" />
                <div>File</div>
              </div>
              <div onClick={() => this.setVariableType("group")} className="option">
                <img src={FolderIcon} alt="Variable Group" />
                <div>Variable Group</div>
              </div>
            </div>
          </div>
        );
        break;
    }

    return (
      <div id="popup" className="variable-upload" style={{ display: this.props.appState.popup_visible }} onClick={this.closePopup}>
        <div id="popup-container" onClick={this.stopProp}>
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appState: state.appState,
  commands: state.commands,
});

export default connect(mapStateToProps, { closePopup, addScript, uploadVariable })(CreateVariable);
