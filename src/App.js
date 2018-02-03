import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import File from './File';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <div>
            <h1>Your files</h1>
            <File name="ecov5" />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
