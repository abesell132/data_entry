import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
import { withRouter } from "react-router-dom";
import "./Home.scss";
import { setPopupType } from "../../redux/actions/appStateActions";
import { queryScripts, getScript, deleteScript } from "../../redux/actions/scriptActions";
import garbageCan from "../../assets/imgs/garbage-can.png";

class Home extends Component {
  constructor() {
    super();
    this.openNewScript = this.openNewScript.bind(this);
  }
  componentDidMount() {
    this.props.queryScripts();
  }
  openNewScript() {
    this.props.setPopupType("NEW_SCRIPT");
  }
  editScript(id) {
    this.props.history.push("/app/" + id);
  }
  deleteScript(id, index) {
    this.props.deleteScript(id, index);
  }
  render() {
    let scriptList = !isEmpty(this.props.auth.accountScripts) ? (
      <div id="script-list">
        {this.props.auth.accountScripts.map((script, index) => (
          <div className="script pointer" key={index} onDoubleClick={() => this.editScript(script.id)}>
            <div>{script.name}</div>
            <div className="delete-button">
              <img src={garbageCan} alt="Delete Script" onClick={() => this.deleteScript(script.id, index)} />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div id="script-list" className="noscript">
        No Scripts Found
      </div>
    );

    return (
      <div id="Home">
        <div id="container">
          <div id="header">
            <button onClick={this.openNewScript}>Add Script</button>
          </div>
          {scriptList}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  appState: state.appState,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setPopupType,
  queryScripts,
  getScript,
  deleteScript,
})(withRouter(Home));
