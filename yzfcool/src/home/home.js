import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './home.scss';
import HomeIndex from './homeIndex/homeIndex';
import YzfAside from '../components/aside/aside';
import NoMatch from '../components/noMatch/noMatch';

class App extends Component {
  state = {
  }
  
  componentWillMount() {
  }

  btnClick = () => {
    console.log('btnClick');
    // const { history } = this.props;
    // history.push('/homeIndex');
  }

  handleBrowserChange = (address) => {
    const { history } = this.props;
    history.push(`${address}`);
  }

  render() {
    return (
      <div className="home-wrapper">
        <YzfAside handleBrowserChange={this.handleBrowserChange} />
        <Switch>
          <Route exact path="/home" component={HomeIndex} />
          <Route path="/home/noMatch" component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
