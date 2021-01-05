import React, { Component } from 'react';
import './aside.scss';

class App extends Component {
  state = {
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="aside-wrapper">
        <div className="logo" onClick={() => { this.props.handleBrowserChange('/') }}>
          <span className="logo-label" title="回到首页">yzfCool</span>
        </div>
        <aside className="aside">
          <div onClick={() => { this.props.handleBrowserChange('/home') }}>Home</div>
          <div onClick={() => { this.props.handleBrowserChange('/home/xx') }}>我的</div>
          <div onClick={() => { this.props.handleBrowserChange('/home/noMatch') }}>React</div>
        </aside>
      </div>
    );
  }
}

export default App;
