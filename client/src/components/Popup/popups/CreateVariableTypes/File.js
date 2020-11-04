import { connect } from "react-redux";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import UploadFileIcon from "../../../../assets/imgs/upload.png";

import { uploadVariable } from "../../../../redux/actions//scriptActions";

import "./CreateVariableTypes.scss";

class File extends Component {
  constructor() {
    super();
    this.onFileUpload = this.onFileUpload.bind(this);
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
        this.props.closePopup();
      }
    });
  }

  render() {
    return (
      <div id="variable-entry">
        <Dropzone onDrop={(acceptedFiles) => this.onFileUpload(acceptedFiles)} multiple={false} accept=".jpeg,.png,.jpg">
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
      </div>
    );
  }
}

export default connect(() => {}, { uploadVariable })(File);
