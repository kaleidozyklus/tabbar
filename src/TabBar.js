import React, { Component } from "react";
import ReactDOM from "react-dom";

import Tab from "./Tab.js";

class TabBar extends Component {
  state = { showArrows: false };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.tabPaneRef = React.createRef();
    this.tabListRef = React.createRef();
    this.scrollIndex = 0;

    this.scrollPosition = 0;
  }

  isShowArrows() {
    if (this.tabPaneRef.current) {
      var width = 0;
      var children = this.tabPaneRef.current.childNodes;
      for (var i = 0; i < children.length; i++) {
        width += children[i].clientWidth;
      }

      return width > this.myRef.current.clientWidth;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    var showArrows = this.isShowArrows();
    if (prevState.showArrows !== showArrows)
      this.setState({ showArrows: showArrows });
  }

  componentWillMount() {
    var showArrows = this.isShowArrows();
    if (this.state.showArrows !== showArrows)
      this.setState({ showArrows: showArrows });
  }

  onDragStart(e, id) {
    e.dataTransfer.setData("id", id);
  }
  onDragOver(e) {
    e.preventDefault();
  }
  onDrop(e) {
    console.log("drop");
  }

  onScrollRight() {
    var end = this.scrollPosition + this.myRef.current.clientWidth;

    console.log("this.scrollPosition " + this.scrollPosition);
    console.log("end " + end);

    var offset = 0;
    if (this.tabListRef.current) {
      var children = this.tabListRef.current.childNodes;
      for (var i = 0; i < children.length && i < this.scrollIndex; i++) {
        var next = children[i].getBoundingClientRect().width;
        if (offset < end && end <= next) {
          this.scrollPosition -= end - offset;
          break;
        }

        offset = next;
      }
    }

    this.tabListRef.current.style.transform = `translate3d(-${
      this.scrollPosition
    }px, 0, 0)`;
  }

  onScrollLeft() {
    this.scrollPosition -= 1;
    if (this.scrollPosition < 0) {
      this.scrollPosition = 0;
    } else {
      var offset = 0;

      if (this.tabListRef.current) {
        var children = this.tabListRef.current.childNodes;
        for (var i = 0; i < children.length; i++) {
          if (
            this.scrollPosition >= offset &&
            this.scrollPosition <
              offset + children[i].getBoundingClientRect().width
          ) {
            this.scrollPosition = offset;
            break;
          }

          offset += children[i].getBoundingClientRect().width;
        }
      }
    }
    this.tabListRef.current.style.transform = `translate3d(-${
      this.scrollPosition
    }px, 0, 0)`;
  }

  render() {
    return (
      <div className="tab-bar" ref={this.myRef}>
        {this.state.showArrows ? (
          <div>
            <button
              onClick={() => {
                this.onScrollLeft();
              }}
            >
              &lt;
            </button>
          </div>
        ) : (
          <div />
        )}

        <div
          id="TabPane"
          className="tab-pane"
          ref={this.tabPaneRef}
          onDragOver={e => {
            this.onDragOver(e);
          }}
          onDrop={e => {
            this.onDrop(e);
          }}
        >
          <div className="tab-list" ref={this.tabListRef}>
            {this.props.tabs.map(tab => {
              return (
                <Tab
                  key={tab.key}
                  title={tab.title}
                  onClose={() => {
                    this.props.onClose(tab.key);
                  }}
                  onDragStart={e => {
                    this.onDragStart(e, tab.key);
                  }}
                />
              );
            })}
          </div>
        </div>

        {this.state.showArrows ? (
          <div>
            <button
              onClick={() => {
                this.onScrollRight();
              }}
            >
              &gt;
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default TabBar;
