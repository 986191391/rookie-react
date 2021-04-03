import React, { Component } from 'react';
import './gobang.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gobangActions from '../../redux/reduces/gobang';

class GobangComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      bgline: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    };
  }
  
  componentWillMount() {
    console.log('props', this.props);
  }

  clickBoard(e) {
    const payload = { x: Number(e.target.dataset.x), y: Number(e.target.dataset.y) }
    this.props.recordCoordinates(payload);
  }

  reload() {
    this.props.reload();
  }

  render() {
    const { x, y, bgline } = this.state;
    const { coordinates, currentPlayer } = this.props.gobang;
    return (
      <div className="gobang-wrapper">
        <div className="board">
          <div className="gobang-board" onClick={(e) => {this.clickBoard(e)}}>
            {
              y.map((yItem, yIndex) => {
                return (
                  <div key={`yItemKey${yItem}`} className="line-y">
                    {
                      x.map((xItem, xIndex) => {
                        const currentCoordinates = coordinates && coordinates.find((coordinatesItem) => coordinatesItem.x === xItem && coordinatesItem.y === yItem);
                        return (
                          <div key={`xItemKey${xItem}`} className="item-x" data-x={xItem} data-y={yItem} >
                            {
                              currentCoordinates && 
                              <div className={currentCoordinates.player ? 'black' : 'white'}></div>
                            }  
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
          <div className="gobang-board-bgline">
            {
              bgline.map((yItem, yIndex) => {
                return (
                  <div key={`yItemKey${yItem}`} className="line-y">
                    {
                      bgline.map((xItem, xIndex) => {
                        return (
                          <div key={`xItemKey${xItem}`} className="item-x" data-x={xItem} data-y={yItem} ></div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="current-info">
          <div>轮到: {currentPlayer ? '黑棋' : '白棋'}</div>
          <div className="reload-btn" onClick={() => {this.reload()}} >重新开始</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gobang: state.gobang
})

const mapDispatchToProps = (dispatch) => ({
  recordCoordinates: (payload) => dispatch(gobangActions.recordCoordinates(payload)),
  reload: () => dispatch(gobangActions.reload())
})

const Gobang = connect(
  mapStateToProps,
  mapDispatchToProps
)(GobangComponent)


export default Gobang;
