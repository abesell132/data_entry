import React, { Component } from "react";
import { connect } from "react-redux";
import { closePopup } from "../../../redux/actions/appStateActions";
import { addScript } from "../../../redux/actions/scriptActions";
import "./css/NewScript.scss";

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
      <div id="popup" className="new-script" style={{ display: this.props.appState.popup_visible }} onClick={this.closePopup}>
        <div id="popup-container" onClick={this.stopProp}>
          <div id="popup-content">
            <div>
              <h3>Add Script</h3>
              <form onSubmit={this.onSubmit}>
                <label>Script Name</label>
                <input type="text" placeholder="Example Script Name" value={this.state.scriptname} onChange={this.onChange} name="scriptname" />
                <button onClick={this.onSubmit}>Add Script</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appState: state.appState,
  commands: state.commands,
});

export default connect(mapStateToProps, { closePopup, addScript })(NewScript);
