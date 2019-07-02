import React, { Component } from "react";

class Tab extends Component {
  render() {
    return (
      <div
        className="tab"
        // draggable="true"
        // onDragStart={e => {
        //   this.props.onDragStart(e);
        // }}
      >
        <div className="title">[{this.props.title}]</div>

        <button
          className="button"
          onClick={this.props.onClose ? () => this.props.onClose() : null}
        >
          x
        </button>
      </div>
    );
  }
}

export default Tab;
