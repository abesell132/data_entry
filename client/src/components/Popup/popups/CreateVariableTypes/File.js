import React, { Component } from "react";
import Dropzone from "react-dropzone";
import UploadFileIcon from "../../../../assets/imgs/upload.png";
import "./CreateVariableTypes.scss";

class File extends Component {
  render() {
    return (
      <div id="variable-entry">
        <h3>Upload File Variable</h3>
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

export default File;
