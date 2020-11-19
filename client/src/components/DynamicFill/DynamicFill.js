import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PlusIcon from "../../assets/imgs/plus.png";
import OffClick from "react-offclick";

function isEqual(a, b) {
  // checking type of a And b
  if (typeof a !== "object" || typeof b !== "object") {
    return false;
  }

  // Both are NULL
  if (!a && !b) {
    return true;
  } else if (!a || !b) {
    return false;
  }

  let keysA = Object.keys(a);
  let keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let key in a) {
    if (!(key in b)) {
      return false;
    }

    if (typeof a[key] === "object") {
      if (!isEqual(a[key], b[key])) {
        return false;
      }
    } else {
      if (a[key] !== b[key]) {
        return false;
      }
    }
  }

  return true;
}

class DynamicFill extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      options: [],
    };
  }
  componentDidMount() {
    let accepts = this.props.field.accepts;
    let variables = this.props.script.variables;
    let options = [];

    // Add Applicable Variables
    variables.map((variable, index) => {
      if (accepts.includes(variable.type)) {
        options.push({ type: "variable", text: variable.name });
      }
      return index;
    });
    // Add Array Variables
    if (this.props.context.includes("commands")) {
      options.push({ text: "Array Value", type: "array" });
      options.push({ text: "Array Index", type: "array" });
    }
    this.setState({
      options,
    });
  }

  componentDidUpdate() {
    let accepts = this.props.field.accepts;
    let variables = this.props.script.variables;
    let options = [];

    // Add Applicable Variables
    variables.map((variable, index) => {
      if (accepts.includes(variable.type)) {
        options.push({ type: "variable", text: variable.name });
      }
      return index;
    });
    // Add Array Variables
    if (this.props.context.includes("commands")) {
      options.push({ text: "Array Value", type: "array" });
      options.push({ text: "Array Index", type: "array" });
    }

    if (!isEqual(this.state.options, options)) {
      this.setState({
        options,
      });
    }
  }
  selectValue(option) {
    this.props.setDynamic(
      this.props.index,
      this.props.field,
      "{" + option.text + "}"
    );
    this.setState({
      open: false,
    });
  }
  onClick() {
    this.setState({
      open: true,
    });
  }
  onOffClick() {
    this.setState({
      open: false,
    });
  }
  render() {
    let options = this.state.open ? (
      <OffClick handler={this.onOffClick.bind(this)}>
        <ul className="Options">
          {this.state.options.map((option, index) => {
            return (
              <li key={index} onClick={() => this.selectValue(option)}>
                {option.text}
              </li>
            );
          })}
        </ul>
      </OffClick>
    ) : (
      ""
    );
    return (
      <div className="dynamic-fill-trigger">
        <img
          src={PlusIcon}
          width="16"
          onClick={this.onClick.bind(this)}
          alt="Fill Dynamically"
        />
        {options}
      </div>
    );
  }
}

DynamicFill.propTypes = {
  field: PropTypes.object,
  openDynamic: PropTypes.func,
};

const mapStateToProps = (state) => ({
  script: state.script,
});

export default connect(mapStateToProps, {})(DynamicFill);
