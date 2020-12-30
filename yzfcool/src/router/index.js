import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import Store from '../redux';
import DevTools from '../redux/DevTools';
import App from '../containers/app';
import Docs from '../containers/docs';
import Home from '../components/home/home';
import HomeIndex from '../components/home/homeIndex';
import Index from '../components/index/index';
import MyIndex from '../components/index/myIndex';
import NoMatch from '../components/noMatch/noMatch';


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
      <div className="router-content">
        {__DEVELOPMENT__ && <DevTools />}
        <Switch>
          <Router path="/" component={App} >
            <Router exact path="/home" component={Home} />
            <Router path="/home/homeIndex/:id" component={HomeIndex} />
            <Router exact path="/react" component={Docs} />
            <Router exact path="/index" component={Index} >
              <Route path="/xx" component={Docs} />
            </Router>
            <Router path="*" component={NoMatch} />
          </Router>
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);

export default hot(module)(Root);
