import React, { Component } from 'react';
import HomeHeader from '../homeHeader/homeHeader';
import './markdown.scss';

class App extends Component {
  state = {
  }
  
  componentDidMount() {
    const editWrapper = this.refs.editwrapper;
    console.log('ref', this.refs, 'editWrapper', editWrapper);
    editWrapper.contentEditable = 'true';
    // document.designMode='on';
  }

  render() {
    return (
      <div className="markdown-wrapper">
        <div className="markdown-header">
          <HomeHeader />
        </div>
        <div className="markdown-content">
          <pre ref="editwrapper" className="edit-wrapper">
            <div className="default-line">
              <span> </span>
            </div>
          </pre>
          <div className="show-wrapper">b</div>
        </div>
      </div>
    );
  }
}

export default App;
