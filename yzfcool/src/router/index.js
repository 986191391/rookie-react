import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import Store from '../redux';
import App from '../containers/app';
import Home from '../home/home';


const Router = ({ component: Component, children, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Component {...props} ><Switch>{children}</Switch></Component>
    )}
  />
);


const Root = () => (
  
  <BrowserRouter>
    <Provider store={Store}>
      <HashRouter>
        <Switch>
          <Router exact path="/" component={App} />
          <Router path="/home" component={Home} />
          {/* <Redirect to="/" /> */}
        </Switch>
      </HashRouter>
    </Provider>
  </BrowserRouter>
);

export default hot(module)(Root);
