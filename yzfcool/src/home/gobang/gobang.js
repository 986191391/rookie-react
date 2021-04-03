import React, { Component } from 'react';
import './gobang.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

@connect(
  state => ({
    home: state.home
  }),
  // 将 reduces/home的 export方法全部绑定到当前的props中
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Gobang extends Component {
  state = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  }
  
  componentWillMount() {
  }

  clickBoard(e) {
    console.log('e.currentTarget', e.currentTarget);
    console.log('e.target', e.target);
  }

  render() {
    const { x, y } = this.state;
    return (
      <div className="gobang-wrapper">
      14 * 14
        <div className="gobang-board" onClick={(e) => {this.clickBoard(e)}}>
          {
            y.map((yItem, yIndex) => {
              return (
                <div key={`yItemKey${yItem}`} className="line-y">
                  {
                    x.map((xItem, xIndex) => {
                      return (
                        <div key={`xItemKey${xItem}`} className="item-x" data-x={xItem} data-y={yItem} >{ xItem }</div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Gobang;
