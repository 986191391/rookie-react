import React, { Component } from 'react';
import './home.scss';

class App extends Component {
  state = {
  }
  
  componentWillMount() {
  }

  btnClick = () => {
    console.log('btnClick');
    const { history } = this.props;
    history.push('/index');
  }

  render() {
    return (
      <div className="home-wrapper">
        <div>这里是首页，点击按钮进入详情页！</div>
        <button onClick={this.btnClick}>Clike Me！</button>
      </div>
    );
  }
}

export default App;
