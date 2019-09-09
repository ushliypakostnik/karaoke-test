import React, { Component } from 'react';

import Player from './Player';

import '../styles/_stylebase.scss';

class App extends Component {
  render() {
    return (
      <div className="page">
        <div className="page__container">
          <div className="card page__content">
          </div>
          <div className="card page__player">
            <Player />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
