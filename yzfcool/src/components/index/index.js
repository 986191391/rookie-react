import React, { Component } from 'react';
import YzfAside from '../aside/aside';
import './index.scss';

class App extends Component {
  state = {
  }
  
  componentWillMount() {
  }

  clickBtn = () => {
    const { history } = this.props;
    history.push('/my/myIndex');
  }

  handleBrowserChange = (address) => {
    const { history } = this.props;
    history.push(`/${address}`);
  }

  render() {
    return (
      <div className="index-wrapper">
        <YzfAside handleBrowserChange={this.handleBrowserChange} />
        <div className="index-content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;
