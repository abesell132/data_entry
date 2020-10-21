import React, { Component } from "react";
import { connect } from "react-redux";
import { closePopup } from "../../../redux/actions/appStateActions";
import { addCommand } from "../../../redux/actions/commandActions";
import "./css/NewScript.scss";

class NewScript extends Component {
  constructor() {
    super();
    this.state = {
      scriptname: "",
    };
    this.closePopup = this.closePopup.bind(this);
    this.stopProp = this.stopProp.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  closePopup() {
    this.props.closePopup();
  }
  stopProp(e) {
    e.stopPropagation();
  }
  onClick(type) {
    this.props.addCommand(type);
    this.props.closePopup();
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    return (
      <div id="popup" className="new-script" style={{ display: this.props.appState.popup_visible }} onClick={this.closePopup}>
        <div id="popup-container" onClick={this.stopProp}>
          <div id="popup-content">
            <div>
              <h3>Add Script</h3>
              <form>
                <label>Script Name</label>
                <input type="text" placeholder="Example Script Name" value={this.state.scriptname} onChange={this.onChange} name="scriptname" />
                <button>Add Script</button>
              </form>
            </div>
          </div>
          <div id="popup-close" onClick={this.closePopup}>
            close
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

export default connect(mapStateToProps, { closePopup, addCommand })(NewScript);
