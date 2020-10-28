import React, { Component } from "react";
import { setPopupType, closePopup } from "../../redux/actions/appStateActions";
import { executeCommands, reorderCommands } from "../../redux/actions/commandActions";
import { saveScript, executeScript, renameScript } from "../../redux/actions/scriptActions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Plus from "../../assets/imgs/plus.png";
import edit from "../../assets/imgs/edit.png";
import "./index.scss";
import { connect } from "react-redux";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

class ActionsContainer extends Component {
  constructor() {
    super();
    this.state = {
      scriptName: "",
      editScriptName: false,
    };
    this.openPopup = this.openPopup.bind(this);
    this.executeCommands = this.executeCommands.bind(this);
    this.saveScript = this.saveScript.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.toggleEditScriptName = this.toggleEditScriptName.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renameScript = this.renameScript.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(this.props.script.list, result.source.index, result.destination.index);
    const itemsJSON = reorder(this.props.script.json, result.source.index, result.destination.index);
    this.props.reorderCommands(items, itemsJSON);
  }
  openPopup() {
    this.props.setPopupType("COMMAND_SELECT");
  }
  saveScript() {
    this.props.saveScript(
      {
        commands: this.props.script.json,
        variables: this.props.script.variables,
        name: this.props.script.name,
      },
      this.props.script.currentScript
    );
  }
  executeCommands() {
    this.props.saveScript(
      {
        commands: this.props.script.json,
        variables: this.props.script.variables,
        name: this.props.script.name,
      },
      this.props.script.currentScript
    );
    this.props.executeScript(this.props.id);
  }
  toggleEditScriptName() {
    this.setState({
      editScriptName: !this.state.editScriptName,
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  renameScript() {
    if (this.state.scriptName !== "") {
      this.props.renameScript(this.state.scriptName, this.props.script.currentScript);
    } else {
      this.props.renameScript(this.props.script.name, this.props.script.currentScript);
    }
    this.toggleEditScriptName();
  }
  render() {
    let scriptName;
    if (!this.state.editScriptName) {
      scriptName = (
        <h3>
          {this.props.script.name} <img src={edit} width="14" className="pointer edit-script-name" onClick={this.toggleEditScriptName} />
        </h3>
      );
    } else {
      scriptName = (
        <div class="change-name-form">
          {<input type="text" name="scriptName" value={this.state.scriptName == "" ? this.props.script.name : this.state.scriptName} onChange={this.onChange} />}
          <input type="submit" className="button pointer" value="Done" onClick={this.renameScript} />
        </div>
      );
    }

    return (
      <div className="actions">
        <div id="action-controls">
          <div>{scriptName}</div>
          <div>
            <button id="execute-script" onClick={this.executeCommands}>
              Execute
            </button>
            <button id="save-script" className="green" onClick={this.saveScript}>
              Save
            </button>
          </div>
        </div>
        <div className="actions-list">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {this.props.script.list.map((item, index) => (
                    <Draggable key={item.props.id} draggableId={item.props.id} index={index} className="action-draggable">
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          {item}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div id="add-action" onClick={this.openPopup}>
          <img src={Plus} style={{ width: "100%" }} alt="Add Command" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appState: state.appState,
  commands: state.commands,
  script: state.script,
});

export default connect(mapStateToProps, {
  executeCommands,
  setPopupType,
  closePopup,
  executeScript,
  saveScript,
  reorderCommands,
  renameScript,
})(ActionsContainer);
