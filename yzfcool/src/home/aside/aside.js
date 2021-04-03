import React, { Component } from 'react';
import './aside.scss';
import logo from '../../assets/logo.jpg';

class App extends Component {
  state = {
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="aside-wrapper">
        <div className="logo" onClick={() => { this.props.handleBrowserChange('/') }}>
          <img className="logo-label" title="回到首页" src={logo} />
        </div>
        <aside className="aside">
          <div onClick={() => { this.props.handleBrowserChange('/home') }}>Home</div>
          <div onClick={() => { this.props.handleBrowserChange('/home/sign') }}>签章Demo</div>
          <div onClick={() => { this.props.handleBrowserChange('/home/gobang') }}>五子棋 gobang</div>
          <div onClick={() => { this.props.handleBrowserChange('/home/markdown') }}>MarkDown Tool</div>
        </aside>
      </div>
    );
  }
}

export default App;
