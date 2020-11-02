import React, { Component } from "react";
import "./CreateVariableTypes.scss";

class Array extends Component {
  render() {
    return (
      <div id="variable-entry" className="container">
        <h3>Add Array Variable</h3>
        <label>Name</label>
        <input name="name" type="text" placeholder={"My Number Variable"} />
        <label>Items</label>
        <input name="value" type="number" placeholder={"42"} />
        <button>Save</button>
      </div>
    );
  }
}

export default Array;
