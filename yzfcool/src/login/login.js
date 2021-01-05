import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from '../redux/reduces/home';
import YzfHeader from '../components/header/header';
import './login.scss';
import logo from '../assets/logo.jpg';

@connect(
  state => ({
    home: state.home,
    cool: 'aas'
  }),
  // 将 reduces/home的 export方法全部绑定到当前的props中
  dispatch => bindActionCreators(homeActions, dispatch)
)

class App extends Component {
  state = {
  }

  componentWillMount() {
  }

  handleBrowserChange = (address) => {
    const { history, changeRoute } = this.props;
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
          <div className="logo-wrapper" onClick={this.btnClick}>
            <img className="logo" src={logo} />
          </div>
          <p className="logo-hint">Click The Jump!</p>
        </div>
      </div>
    );
  }
}

export default App;
