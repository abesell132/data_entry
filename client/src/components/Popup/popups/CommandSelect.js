import React, { Component } from "react";
import QuestionMark from "../../../assets/imgs/question-mark.png";
import { connect } from "react-redux";
import { closePopup } from "../../../redux/actions/appStateActions";
import { addCommands } from "../../../redux/actions/commandActions";
import Standard from "./CommandSelect/Standard";
import "./css/CommandSelect.scss";

class CommandSelect extends Component {
  constructor() {
    super();
    this.state = {
      folder: "",
    };
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
  changeFolder(data) {
    this.setState({
      folders: data,
    });
  }
  onClick(command) {
    this.props.addCommands(this.props.appState.popup_data.context, [command], this.props.appState.popup_data.contextCommands);
    this.props.closePopup();
  }
  render() {
    let content;

    switch (this.state.folders) {
      case "standard":
        content = <Standard />;
        break;
      default:
        content = (
          <div id="popup-content">
            <div onClick={() => this.changeFolder("standard")}>
              <div>Standard</div>
              <div className="action-question-mark">
                <img src={QuestionMark} alt="More Information" />
              </div>
            </div>
            <div onClick={() => this.onClick({ type: "ARRAY_LOOP", array: [], commands: [] })}>
              <div>Loop Block</div>
              <div className="action-question-mark">
                <img src={QuestionMark} alt="More Information" />
              </div>
            </div>
            <div onClick={() => this.onClick({ type: "TYPE", selector: "", text: "" })}>
              <div>DOM Tools</div>
              <div className="action-question-mark">
                <img src={QuestionMark} alt="More Information" />
              </div>
            </div>
          </div>
        );
    }

    return (
      <div id="popup" className="command-select" onClick={this.closePopup}>
        <div id="popup-container" onClick={this.stopProp}>
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appState: state.appState,
  commands: state.commands,
});

export default connect(mapStateToProps, { closePopup, addCommands })(CommandSelect);
