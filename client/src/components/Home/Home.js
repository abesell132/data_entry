import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.scss";
import { setPopupType } from "../../redux/actions/appStateActions";
import garbageCan from "../../assets/imgs/garbage-can.png";

class Home extends Component {
  constructor() {
    super();
    this.openNewScript = this.openNewScript.bind(this);
  }
  openNewScript() {
    this.props.setPopupType("NEW_SCRIPT");
  }
  render() {
    let scriptList = true ? (
      <div id="script-list">
        <div className="script pointer">
          <div>Wordpress Plugin Update</div>
          <div className="delete-button">
            <img src={garbageCan} alt="Delete Script" />
          </div>
        </div>
        <div className="script">Example Name</div>
        <div className="script">Example Name</div>
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
});

export default connect(mapStateToProps, {
  setPopupType,
})(Home);
