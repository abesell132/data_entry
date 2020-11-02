import React, { Component } from "react";
import { connect } from "react-redux";
import { setPopupType, setPopupData } from "../../redux/actions/appStateActions";
import { deleteVariable } from "../../redux/actions/scriptActions";
import photoImage from "../../assets/imgs/picture.png";
import GarbageCan from "../../assets/imgs/garbage-can.png";
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
    this.props.setPopupType("VARIABLE_CREATE");
  }
  deleteVariable(e, id) {
    e.stopPropagation();
    this.props.deleteVariable(id);
  }
  render() {
    return (
      <div className="variables">
        <div id="variables-header">
          <button onClick={this.addVariable}>Add Variable</button>
        </div>
        <div id="variables-content">
          {this.props.script.variables.map((element, index) => {
            return (
              <div key={index} className="variable" onClick={() => this.openVariable({ type: "uploaded", id: element.id })}>
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
                  <img src={GarbageCan} onClick={(e) => this.deleteVariable(e, element.id)} alt="Delete Variable" />
                </div>
              </div>
            );
          })}
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
