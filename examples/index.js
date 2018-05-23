import React, { Component } from "react";
import ReactDOM from 'react-dom';
import AuthEditor from '../src/index.js';
import { allFeatures, allMenus, auth } from './testData';

class App extends Component {

  constructor() {
    super();
    this.state = {
      allFeatures: allFeatures,
      allMenus: allMenus,
      auth: auth,
      selectedTabIndex: 0
    };
  }

  render() {

    const { allFeatures, allMenus, auth, selectedTabIndex  } = this.state;

    return (
      <div>
        <AuthEditor
          allFeatures={allFeatures}
          allMenus={allMenus}
          auth={auth}
          selectedTabIndex={selectedTabIndex}
          onTabChange={this.onTabChange.bind(this)}
          onAuthChange={this.onAuthChange.bind(this)}
        />
      </div>
    );
  }

  onTabChange(nextSelectedTabIndex) {
    this.setState({
      selectedTabIndex: nextSelectedTabIndex
    })
  }

  onAuthChange(nextAuth) {
    this.setState({
      auth: nextAuth
    })
  }
   
}

ReactDOM.render(<App />, document.getElementById('root')); 