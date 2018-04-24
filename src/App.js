import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import Nav from './components/Nav/Nav';

class App extends Component {
  render() {
    var render = window.location.href === 'http://localhost:3000/#/' || 'http://localhost:3000/#/createuser' ?  <div>
    {routes}
  </div> : <div>
    <Nav />
  {routes}
  </div>
    return (
      <div>
        {render}
      </div>
    );
  }
}

export default App;
