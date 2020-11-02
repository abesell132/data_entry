import React, { Component } from "react";
import "./CreateVariableTypes.scss";

class Group extends Component {
  render() {
    return (
      <div id="variable-entry" className="container">
        <h3>Add Variable Group</h3>
        <label>Name</label>
        <input name="name" type="text" placeholder={"My Number Variable"} />
        <button>Save</button>
      </div>
    );
  }
}

export default Group;
