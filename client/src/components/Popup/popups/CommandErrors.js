import React, { Component } from "react";
import { connect } from "react-redux";
import { closePopup } from "../../../redux/actions/appStateActions";
import { addScript, uploadVariable, executeScript } from "../../../redux/actions/scriptActions";
import exclamationMark from "../../../assets/imgs/exclamation-mark.png";
import "./css/ExecuteCommands.scss";

class CommandErrors extends Component {
  constructor() {
    super();
    this.closePopup = this.closePopup.bind(this);
    this.stopProp = this.stopProp.bind(this);
  }
  closePopup() {
    this.props.closePopup();
  }
  stopProp(e) {
    e.stopPropagation();
  }

  render() {
    return (
      <div id="popup" className="execute-confirm" style={{ display: this.props.appState.popup_visible }} onClick={this.closePopup}>
        <div id="popup-container" onClick={this.stopProp}>
          <div id="popup-content">
            <section>
              <div>
                <img src={exclamationMark} alt="Alert" width="100" />
                <h3>Your Script Has Some Errors</h3>
                <div>Please correct these issues and try saving again.</div>
                <button onClick={this.closePopup}>Confirm</button>
              </div>
            </section>
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

export default connect(mapStateToProps, { closePopup, addScript, uploadVariable, executeScript })(CommandErrors);
