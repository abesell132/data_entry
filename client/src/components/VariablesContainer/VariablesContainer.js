import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
import { setPopupType, setPopupData } from "../../redux/actions/appStateActions";
import { uploadVariable } from "../../redux/actions/scriptActions";
import photoImage from "../../assets/imgs/picture.png";
import "./index.scss";

class VariablesContainer extends Component {
  constructor() {
    super();
    this.openVariable = this.openVariable.bind(this);
    this.addVariable = this.addVariable.bind(this);
  }
  openVariable(data) {
    this.props.setPopupType("VARIABLE");
    this.props.setPopupData(data);
  }
  addVariable() {
    this.props.setPopupType("VARIABLE_UPLOAD");
  }
  render() {
    return (
      <div className="variables">
        <div id="variables-header">
          <button onClick={this.addVariable}>Add Variable</button>
        </div>
        <div id="variables-content">
          {this.props.scripts.variables.map((element, index) => {
            return (
              <div key={index} className="variable" onClick={() => this.openVariable({ type: element.type, name: element.name })}>
                <div className="file-type">
                  <img src={photoImage} alt="Decoration" />
                </div>
                <div className="file-name">
                  <h4>Image {element.type == "generated" ? <small>- generated</small> : ""}</h4>
                  <span>{element.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  scripts: state.scripts,
});

export default connect(mapStateToProps, {
  setPopupType,
  setPopupData,
})(VariablesContainer);
