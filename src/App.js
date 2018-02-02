import React, { Component } from 'react';

import FileList from './FileList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Your files</h1>
        <FileList />
      </div>
    );
  }
}

export default App;
