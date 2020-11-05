import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";

import PlusIcon from "../../assets/imgs/plus.png";
import OffClick from "react-offclick";

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
        options.push(variable.name);
      }
    });
    // Add Array Variables
    if (this.props.context.includes("commands")) {
      options.push("Array Value");
      options.push("Array Index");
    }
    this.setState({
      options,
    });
  }
  selectValue(name) {
    this.props.setDynamic(this.props.index, this.props.field, "{" + name + "}");
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
                {option}
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
        <img src={PlusIcon} width="16" onClick={this.onClick.bind(this)} alt="Fill Dynamically" />
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
