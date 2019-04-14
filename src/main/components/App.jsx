import React, { Component } from 'react';
import chance from 'chance'

class App extends Component {
  render() {
    return (
      <div className="App" style={{backgroundColor: `${chance.Chance().color()}`}}>
        <header className="App-header">
          <h1>Randomizador</h1>
        </header>
      </div>
    );
  }
}

export default App;
