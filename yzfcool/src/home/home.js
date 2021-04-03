import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './home.scss';
import HomeIndex from './homeIndex/homeIndex';
import ToyAside from './aside/aside';
import NoMatch from '../components/noMatch/noMatch';
import Gobang from './gobang/gobang';
import MarkDown from './markdown/markdown';
import Sign from './sign/sign';

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
        <div className="home-aside">
          <ToyAside handleBrowserChange={this.handleBrowserChange} />
        </div>
        <div className="home-main">
          <Switch>
            <Route exact path="/home" component={HomeIndex} />
            <Route path="/home/sign" component={Sign} />
            <Route path="/home/gobang" component={Gobang} />
            <Route path="/home/markdown" component={MarkDown} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
