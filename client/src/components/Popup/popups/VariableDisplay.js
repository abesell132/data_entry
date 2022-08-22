import React, { Component } from "react";
import { connect } from "react-redux";
import { closePopup } from "../../../redux/actions/appStateActions";
import { addScript } from "../../../redux/actions/scriptActions";
import "./css/VariableDisplay.scss";

class VariableDisplay extends Component {
  constructor() {
    super();
    this.state = {
      scriptname: "",
    };
    this.stopProp = this.stopProp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  stopProp(e) {
    e.stopPropagation();
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.addScript(this.state.scriptname);
    this.props.closePopup();
  }

  render() {
    let popup_data = this.props.appState.popup_data;
    return (
      <div
        id="popup"
        className="variable-display"
        style={{ display: this.props.appState.popup_visible }}
        onClick={this.props.closePopup}
      >
        <div id="popup-container" onClick={this.stopProp}>
          <div id="popup-content" className="image">
            <img
              src={`/api/scripts/variable/${this.props.script.currentScript}/${
                popup_data.generated ? "generated" : "uploaded"
              }/${popup_data.generated ? popup_data.name : popup_data.id}`}
              alt="Variable Display Popup"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appState: state.appState,
  commands: state.commands,
  script: state.script,
});

export default connect(mapStateToProps, { closePopup, addScript })(VariableDisplay);
