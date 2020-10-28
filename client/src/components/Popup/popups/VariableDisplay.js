import React, { Component } from "react";
import { connect } from "react-redux";
import { closePopup } from "../../../redux/actions/appStateActions";
import { addScript } from "../../../redux/actions/scriptActions";
import "./css/VariableDisplay.scss";

class NewScript extends Component {
  constructor() {
    super();
    this.state = {
      scriptname: "",
    };
    this.closePopup = this.closePopup.bind(this);
    this.stopProp = this.stopProp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  closePopup() {
    this.props.closePopup();
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
    this.closePopup();
  }

  render() {
    return (
      <div id="popup" className="variable-display" style={{ display: this.props.appState.popup_visible }} onClick={this.closePopup}>
        <div id="popup-container" onClick={this.stopProp}>
          <div id="popup-content" className="image">
            <img
              src={`http://localhost:5000/api/scripts/variable/${this.props.script.currentScript}/${this.props.appState.popup_data.type}/${this.props.appState.popup_data.name}`}
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

export default connect(mapStateToProps, { closePopup, addScript })(NewScript);
