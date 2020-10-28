import React, { Component } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { closePopup } from "../../../redux/actions/appStateActions";
import { addScript, uploadVariable } from "../../../redux/actions/scriptActions";
import isEmpty from "../../../validation/is-empty";
import UploadFileIcon from "../../../assets/imgs/upload.png";
import "./css/VariableUpload.scss";

class NewScript extends Component {
  constructor() {
    super();
    this.state = {
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
    } else {
      content = (
        <Dropzone onDrop={(acceptedFiles) => this.onFileUpload(acceptedFiles)} multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <img src={UploadFileIcon} alt="File Upload Graphic" />
                <h3>Drag and Drop file</h3>
                <h4>or</h4>
                <button>Browse</button>
              </div>
            </section>
          )}
        </Dropzone>
      );
    }
    return (
      <div id="popup" className="variable-upload" style={{ display: this.props.appState.popup_visible }} onClick={this.closePopup}>
        <div id="popup-container" onClick={this.stopProp}>
          <div id="popup-content">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appState: state.appState,
  commands: state.commands,
});

export default connect(mapStateToProps, { closePopup, addScript, uploadVariable })(NewScript);
