import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from '../redux/reduces/home';
import YzfHeader from '../components/header/header';
import './login.scss';

@connect(
  state => ({
    home: state.home,
    cool: 'aas'
  }),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class App extends Component {
  state = {
  }

  componentWillMount() {
    const { initalLogo } = this.props;
    initalLogo();
  }

  handleBrowserChange = (address) => {
    console.log('address', address);
    const { history, changeRoute } = this.props;
    changeRoute();
    history.push(`/${address}`);
  }

  btnClick = () => {
    const { history } = this.props;
    history.push('home');
  }

  render() {
    return (
      <div className="app-root">
        <YzfHeader />
        <div className="app-content">
          这里是登录页，最外层的route，点击按钮跳转到详情页xx
          <button onClick={this.btnClick} > click me!</button>
        </div>
      </div>
    );
  }
}

export default App;
