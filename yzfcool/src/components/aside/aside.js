import React, { Component } from 'react';
import './aside.scss';

class App extends Component {
  state = {
  }

  componentWillMount() {
    console.log('propsxxxx', this.props);
  }

  render() {
    return (
      <div className="aside-wrapper">
        <div className="logo">yzfCool</div>
        <aside className="aside">
          <div onClick={() => { this.props.handleBrowserChange('home') }}>Home</div>
          <div onClick={() => { this.props.handleBrowserChange('index/xx') }}>我的</div>
          <div onClick={() => { this.props.handleBrowserChange('react') }}>React</div>
        </aside>
      </div>
    );
  }
}

export default App;
