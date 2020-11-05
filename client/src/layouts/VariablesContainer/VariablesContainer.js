import React, { Component } from "react";
import { connect } from "react-redux";

import Image from "./Types/Image";
import String from "./Types/String";
import Number from "./Types/Number";
import Array from "./Types/Array";

import { deleteVariable } from "../../redux/actions/scriptActions";
import { setPopupType, setPopupData } from "../../redux/actions/appStateActions";

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
    const mapVariables = (varArr) =>
      varArr.map((element, index) => {
        switch (element.type) {
          case "string":
            return <String element={element} key={index} />;
          case "number":
            return <Number element={element} key={index} />;
          case "array":
            return <Array element={element} key={index} />;
          case "image":
            return <Image element={element} key={index} />;
          default:
            alert("ERrorrrrr");
            return "0";
        }
      });
    return (
      <div className="variables">
        <div id="variables-header">
          <button onClick={this.addVariable}>Add Variable</button>
        </div>
        <div id="variables-content">{mapVariables(this.props.script.variables)}</div>
        <div id="generated-content">
          {this.props.script.generated.length !== 0 ? <h3>Generated</h3> : ""}
          {mapVariables(this.props.script.generated)}
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
