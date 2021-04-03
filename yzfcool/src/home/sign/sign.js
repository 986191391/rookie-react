import React, { Component } from 'react';
import { Button, Select } from 'antd';
import './sign.scss';
import bg from '../../assets/bg.jpg';
import stampFirst from '../../assets/stamp1.jpg';
import stampSecond from '../../assets/stamp2.jpg';
import { useState } from 'react';

const { Option } = Select;

class Sign extends Component {
  state = {
    stamp: 0,
    stampIndex: 0,
    stampList: [],
    isDrag: false,
    currentSelfX: 0,
    currentSelfY: 0
  }
  
  componentDidMount() {
    if (!this.state.stampList.length) {
      const newStampList = this.state.stampList;
      newStampList.push({
        custom: true,
        top: 67,
        left: 548,
        imgUrl: stampSecond
      });
      this.setState({ stampList: newStampList });
      console.log('this.stampList', newStampList);
    }
  }

  selectFile(e) {
    console.log('ee', this.refs.inputFile, this.refs.inputFile.value);
  }

  stampSelectChange(value) {
    console.log('value', value, 'stamplist', this.state.stampList);

    const imgUrl = value ? stampFirst : stampSecond;
    const newStampList = this.state.stampList.map((item) => {
      if (!item.custom) return item;
      item.imgUrl = imgUrl;
      return item;
    });
    this.setState({ stamp: value, stampList: newStampList });
  } 

  onCustomSignMouseDown(e, index) {
    e.preventDefault();
    
    // 获取并记录 基于拖拽图片左上角 的 X Y值
    let currentSelfX = e.clientX - this.state.stampList[index].left - 210;
    let currentSelfY = e.clientY - this.state.stampList[index].top - 129;
    this.setState({ isDrag: true, stampIndex: index, currentSelfX, currentSelfY });
    console.log('e.clientX', e.clientX, 'e.clientY', e.clientY, 'currentSelfX', currentSelfX, 'currentSelfY', currentSelfY);
  }

  onCustomSignMouseMove(e) {
    if (!this.state.isDrag) return;
    const newStampList = this.state.stampList;
    let newLeft = e.clientX - 210 - this.state.currentSelfX;
    let newTop = e.clientY - 129 - this.state.currentSelfY;
    if(newLeft < 0) newLeft = 0;
    if(newLeft > 377.5) newLeft = 377.5;
    if(newTop < 0) newTop = 0;
    if(newTop > 550) newTop = 550;
    
    newStampList[this.state.stampIndex].left = newLeft;
    newStampList[this.state.stampIndex].top = newTop;
    this.setState({ stampList: newStampList });
  }

  onCustomSignMoveUp(e) {
    if (!this.state.isDrag) return;
    this.setState({ isDrag: false });
    console.log('onCustomSignMoveUp', e);

    let newLeft = e.clientX - 210 - this.state.currentSelfX;
    let newTop = e.clientY - 129 - this.state.currentSelfY;

    // 鼠标松开，如果是在区域内，则新增一个自定义的签章
    if(newLeft > 0 && newLeft <= 377.5 && newTop > 0 && newTop <= 550) {
      const newStampList = this.state.stampList;
      newStampList[this.state.stampIndex].custom = false;
      newStampList.push({
        custom: true,
        top: 67,
        left: 548,
        imgUrl: this.state.stamp ? stampFirst : stampSecond
      });
      this.setState({ stampList: newStampList });
    }
  }
  

  render() {
    const { stamp, stampList } = this.state;
    return (
      <div className="sign-wrapper">
        <div className="sign-hint">此页面为拖动签章到图片进行盖章的功能</div>
        <div 
          className="sign-content" 
          onMouseMove={(e) => {this.onCustomSignMouseMove(e)}} 
          onMouseUp={(e) => {this.onCustomSignMoveUp(e)}} 
        >
          <div className="file-wrapper">
            <img className="file" src={bg} />
            {
              stampList.map((listItem, index) => {
                return (
                  <div 
                    key={`stamp-${index}`} 
                    className="custom-sign" 
                    style={{ top: listItem.top, left: listItem.left }} 
                    onMouseDown={(e) => {this.onCustomSignMouseDown(e, index)}} 
                  >
                    <img src={listItem.imgUrl} />
                  </div>
                )
              })
            }
          </div>
          <div className="stamp-wrapper">
            <div>
              <Select defaultValue={0} style={{ width: 140 }} onChange={(value) => { this.stampSelectChange(value) }}>
                <Option value={0}>蜡笔小新印章</Option>
                <Option value={1}>二维码印章</Option>
              </Select>
            </div>
            <div className="stamp-img"> 
              <img style={{ width: 140, height: 140 }} src={stamp ? stampFirst : stampSecond} /> 
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Sign;
