import React, { Component } from "react";
import "./CreateVariableTypes.scss";

class String extends Component {
  render() {
    return (
      <div id="variable-entry" className="container">
        <h3>Add String Variable</h3>
        <label>Name</label>
        <input name="name" type="text" placeholder={"My First Variable"} />
        <label>Value</label>
        <input name="value" type="text" placeholder={"Here's an example string.."} />
        <button>Save</button>
      </div>
    );
  }
}

export default String;
