import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import TabBar from "./TabBar.js";

class App extends Component {
  state = { documents: [] };

  createDocumentKey(documents) {
    var key = 1;
    while (documents.find(doc => doc.key === key)) key += 1;
    return key;
  }

  add() {
    var newDoc = {
      key: this.createDocumentKey(this.state.documents),
      title: "doc" + (this.state.documents.length + 1),
      modified: true
    };

    console.log(JSON.stringify(newDoc));

    this.setState({ documents: this.state.documents.concat([newDoc]) });
  }

  close(key) {
    this.setState({
      documents: this.state.documents.filter(doc => doc.key !== key)
    });
  }

  render() {
    return (
      <div className="App">
        <button
          onClick={() => {
            this.add();
          }}
        >
          +
        </button>
        <TabBar
          tabs={this.state.documents.map(doc => {
            return { key: doc.key, title: doc.title };
          })}
          onClose={key => this.close(key)}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
