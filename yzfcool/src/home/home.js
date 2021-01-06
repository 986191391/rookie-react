import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './home.scss';
import HomeIndex from './homeIndex/homeIndex';
import YzfAside from '../components/aside/aside';
import NoMatch from '../components/noMatch/noMatch';
import MarkDown from './markdown/markdown';

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
        <div className="aside">
          <YzfAside handleBrowserChange={this.handleBrowserChange} />
        </div>
        <div className="main">
          <Switch>
            <Route exact path="/home" component={HomeIndex} />
            <Route path="/home/noMatch" component={NoMatch} />
            <Route path="/home/markdown" component={MarkDown} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
