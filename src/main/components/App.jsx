import React, { Component } from 'react';
import Template from './Template/'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Template>
          <div className="section">
            <div className="container">
              <div className="row">
                <div className="col">
                  <h1>teste</h1>
                </div>
              </div>
            </div>
          </div>
        </Template>
      </div>
    );
  }
}

export default App;
