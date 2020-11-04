import React, { Component } from "react";
import { connect } from "react-redux";

import Variable from "./Variable";
import String from "./Types/String";
import Number from "./Types/Number";
import Array from "./Types/Array";

import { deleteVariable } from "../../redux/actions/scriptActions";
import { setPopupType, setPopupData } from "../../redux/actions/appStateActions";

import photoImage from "../../assets/imgs/picture.png";
import GarbageCan from "../../assets/imgs/garbage-can.png";
import "./index.scss";

class VariablesContainer extends Component {
  constructor() {
    super();
    this.addVariable = this.addVariable.bind(this);
  }
  addVariable() {
    this.props.setPopupType("VARIABLE_CREATE");
  }

  render() {
    return (
      <div className="variables">
        <div id="variables-header">
          <button onClick={this.addVariable}>Add Variable</button>
        </div>
        <div id="variables-content">
          {this.props.script.variables.map((element, index) => {
            switch (element.type) {
              case "string":
                return <String element={element} key={index} />;
              case "number":
                return <Number element={element} key={index} />;
              case "array":
                return <Array element={element} key={index} />;
              default:
                return <Variable element={element} key={index} />;
            }
          })}
        </div>
        <div id="variables-content">
          {this.props.script.generated.map((element, index) => {
            return (
              <div key={index} className="variable" onClick={() => this.openVariable({ type: "generated", id: element.name })}>
                <div className="variable-meta">
                  <div className="file-type">
                    <img src={photoImage} alt="Decoration" />
                  </div>
                  <div className="file-name">
                    <h4>Image {element.type === "generated" ? <small>- generated</small> : ""}</h4>
                    <span>{element.name}</span>
                  </div>
                </div>
                <div className="delete-variable">
                  <img src={GarbageCan} onClick={(e) => this.deleteVariable(e, element.name, element.type === "generated" ? 1 : 0, index)} alt="Delete Variable" />
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
  script: state.script,
});

export default connect(mapStateToProps, {
  setPopupType,
  deleteVariable,
  setPopupData,
})(VariablesContainer);
