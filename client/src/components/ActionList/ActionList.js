import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { updateCommandList } from "../../redux/actions/commandActions";
import getElementConfig from "../../CommandBlocks/ElementConfig";
import LoopBlock from "../../CommandBlocks/LoopBlock";
import DefaultBlock from "../../CommandBlocks/DefaultBlock";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

class ActionList extends Component {
  constructor() {
    super();
    this.state = {
      saving: false,
      commandErrors: false,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.deleteBlock = this.deleteBlock.bind(this);
  }
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const itemsJSON = reorder(
      this.props.mapItems,
      result.source.index,
      result.destination.index
    );
    this.props.updateCommandList(this.props.listContext, itemsJSON);
  }

  deleteBlock(index) {
    let items = this.props.mapItems;
    items.splice(index, 1);
    this.props.updateCommandList(this.props.listContext, items);
  }
  render() {
    const getBlockType = (type, elementProps, index) => {
      switch (type) {
        case "ARRAY_LOOP":
          return (
            <LoopBlock
              {...elementProps}
              commandList={elementProps.commands}
              index={index}
              blockContext={
                this.props.listContext !== ""
                  ? this.props.listContext + "." + index
                  : "." + index
              }
              deleteBlock={this.deleteBlock}
            />
          );
        default:
          return (
            <DefaultBlock
              {...elementProps}
              index={index}
              blockContext={this.props.listContext}
              deleteBlock={this.deleteBlock}
            />
          );
      }
    };

    return (
      <div className="actions-list" onClick={(e) => e.preventDefault()}>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragUpdate={this.onDragUpdate}
        >
          <Droppable
            droppableId={this.props.droppableId}
            type={this.props.droppableId}
          >
            {(provided) => (
              <div ref={provided.innerRef}>
                {this.props.mapItems.map((item, index) => {
                  let elementProps = getElementConfig(item).actionBlockProps;
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                      className="action-draggable"
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          {
                            <div {...provided.dragHandleProps}>
                              {getBlockType(item.type, elementProps, index)}
                            </div>
                          }
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  script: state.script,
});

export default connect(mapStateToProps, {
  updateCommandList,
})(ActionList);
