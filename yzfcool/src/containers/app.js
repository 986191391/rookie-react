import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from '~/assets/logo.png';
import * as homeActions from '../redux/reduces/home';
import YzfAside from '../components/aside/aside';
import YzfHeader from '../components/header/header';
import './app.scss';

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

  render() {
    return (
      <div className="app-root">
        <YzfHeader />
        {/* <YzfAside handleBrowserChange={this.handleBrowserChange} /> */}
        <div className="app-content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;
