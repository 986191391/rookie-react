import React, { Component } from 'react';
import './gobang.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gobangActions from '../../redux/reduces/gobang';

class GobangComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: [...Array(15)].map((item, index) => index + 1),
      y: [...Array(15)].map((item, index) => index + 1),
      bgline: [...Array(14)].map((item, index) => index + 1)
    };
  }
  
  componentWillMount() {
    this.init();
  }

  init() {
    const initCoordinates = this.buildCoordinates();
    this.props.initCoordinates(initCoordinates);
  }

  buildCoordinates() {
    let coordinates = [];
    for(let i = 1; i < 16; i++) {
      for(let j = 1; j < 16; j++) {
        coordinates.push({ x: i, y: j, player: null })
      }
    }
    return coordinates;
  }

  clickBoard(e) {
    // const { x, y } = e.target.dataset;
    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);
    const { coordinates } = this.props.gobang;
    // 如果点的是棋子那个div 没有绑定dataset 所以xy都为空
    if(!x && !y) return console.log('这个位置已经下了,请换一个位置!');
    // 如果点击了棋子所在的格子 则有绑定dateset 需要判断一下是否已经下了
    const curCoordinatesItem = coordinates.find((item) => item.x === x && item.y === y);
    if (curCoordinatesItem.player !== null) return console.log('这个位置已经下了,请换一个位置!');

    const payload = { x, y }
    this.props.recordCoordinates(payload);

    this.checkFinish(x, y);
  }

  reload() {
    this.init();
  }

  checkFinish(x, y) {
    this.checkLineX(x, y);
    this.checkLineY(x, y);
    this.checkDeclivous(x, y);
    this.checkUptilt(x, y);
  }

  checkLineX(x, y) {
    const { coordinates } = this.props.gobang;
    // 拿到y相同的所有数据， 即为同一行的所有数据(落点的x轴)
    const xline = coordinates.filter((item) => item.y === y);
    // 再次过滤，过滤落点位置 +-5 范围内的数据
    const xlineEffective = xline.filter((item) => (item.x < x + 5) && (item.x > x - 5));
    // 把整理好的数据 循环判断是否有5个连续相同 有则胜利 无则继续
    const isXlineWin = this.checkWin(xlineEffective);
    if (isXlineWin) return console.log('xline win');
  }

  checkLineY(x, y) {
    // 与 checkLineY 一致
    const { coordinates } = this.props.gobang;
    const yline = coordinates.filter((item) => item.x === x);
    const ylineEffective = yline.filter((item) => (item.y < y + 5) && (item.y > y - 5));
    const isYlineWin = this.checkWin(ylineEffective);
    if (isYlineWin) return console.log('yline win');
  }
  
  checkDeclivous(x, y) {
    const { coordinates } = this.props.gobang;
    const declivousLine = coordinates.filter((item) => item.x - item.y === x - y);
    const declivousLineEffective = declivousLine.filter((item) => (item.x < x + 5) && (item.x > x - 5));
    const isDeclivousWin = this.checkWin(declivousLineEffective);
    if (isDeclivousWin) return console.log('declivous win');
  }

  checkUptilt(x, y) {
    const { coordinates } = this.props.gobang;
    const uptiltLine = coordinates.filter((item) => item.x + item.y === y + x);
    const uptiltLineEffective = uptiltLine.filter((item) => (item.x < x + 5) && (item.x > x - 5));
    const isUptiltWin = this.checkWin(uptiltLineEffective);
    if (isUptiltWin) return console.log('uptilt win');
  }

  checkWin(checkArr) {
    const checkArrLength = checkArr.length;
    // 需要循环的次数为 数组长度-4
    const count = checkArrLength - 4;
    // 开始循环
    for(let num = 0; num < count; num++) {
      // 使用 slice 方法截取要判断的片段, 该方法不改变原数组, 传递的参数位置 含头不含尾
      const checkPart = checkArr.slice(num, num + 5);
      // 判断截取的 5个 的player是否为同一个人 是则返回true 不是则继续循环
      // 取出第一项 用后面循环的判断
      const firstPlayer = checkPart[0].player;
      const isWin = checkPart.some((item) => item.player !== firstPlayer);
      if (!isWin) return true;
    }
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
                              currentCoordinates && currentCoordinates.player !== null &&
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
  reload: () => dispatch(gobangActions.reload()),
  initCoordinates: (payload) => dispatch(gobangActions.initCoordinates(payload))
})

const Gobang = connect(
  mapStateToProps,
  mapDispatchToProps
)(GobangComponent)


export default Gobang;
