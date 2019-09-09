import React, { Component, Fragment } from 'react';

import '../styles/_stylebase.scss';

class App extends Component {
  render() {
    return (
      <div className="page">
        <div className="page__container">
          <div className="card page__content">
          </div>
          <div className="card page__player">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
