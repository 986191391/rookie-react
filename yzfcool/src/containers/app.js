import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './app.scss';
import Login from '../login/login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    );
  }
}

export default App;
