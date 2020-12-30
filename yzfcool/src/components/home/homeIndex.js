import React, { Component } from 'react';

class App extends Component {
  state = {
  }
  
  componentWillMount() {
    console.log('homeIndex page', this.props);
  }

  render() {
    return (
      <div className="home-wrapper">
        hi, i am homeIndex Page!
      </div>
    );
  }
}

export default App;
