import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from '../redux/reduces/home';
import YzfHeader from '../components/header/header';
import './app.scss';
import Login from '../login/login';


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
    console.log('appclick', this.props);
    // const { history } = this.props;
    // history.push('/home');
  }

  render() {
    return (
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    );
  }
}

export default App;
