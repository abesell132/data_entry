import React, { Component } from "react";
import QuestionMark from "../../../assets/imgs/question-mark.png";
import { connect } from "react-redux";
import { closePopup } from "../../../redux/actions/appStateActions";
import { addCommand } from "../../../redux/actions/commandActions";
import "./css/CommandSelect.scss";

class CommandSelect extends Component {
  constructor() {
    super();
    this.closePopup = this.closePopup.bind(this);
    this.stopProp = this.stopProp.bind(this);
    this.onClick = this.onClick.bind(this);
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
  render() {
    return (
      <div id="popup" className="command-select" onClick={this.closePopup}>
        <div id="popup-container" onClick={this.stopProp}>
          <div id="popup-content">
            <div onClick={() => this.onClick("CLICK")}>
              <div>Click</div>
              <div className="action-question-mark">
                <img src={QuestionMark} alt="More Information" />
              </div>
            </div>
            <div onClick={() => this.onClick("LOAD_URL")}>
              <div>Load Url</div>
              <div className="action-question-mark">
                <img src={QuestionMark} alt="More Information" />
              </div>
            </div>
            <div onClick={() => this.onClick("SCREENSHOT")}>
              <div>Screenshot</div>
              <div className="action-question-mark">
                <img src={QuestionMark} alt="More Information" />
              </div>
            </div>
            <div onClick={() => this.onClick("SET_TIMEOUT")}>
              <div>Set Timeout</div>
              <div className="action-question-mark">
                <img src={QuestionMark} alt="More Information" />
              </div>
            </div>
            <div onClick={() => this.onClick("SUBMIT_FORM")}>
              <div>Submit Form</div>
              <div className="action-question-mark">
                <img src={QuestionMark} alt="More Information" />
              </div>
            </div>
            <div onClick={() => this.onClick("TYPE")}>
              <div>Type</div>
              <div className="action-question-mark">
                <img src={QuestionMark} alt="More Information" />
              </div>
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

export default connect(mapStateToProps, { closePopup, addCommand })(CommandSelect);
