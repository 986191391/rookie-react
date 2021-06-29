import React, { Component } from 'react';
import './viewport.scss';
import vData from './viewportJSON/ReGroup.json';

class Viewport extends Component {
  state = {
  }
  
  componentWillMount() {
    // const viewportData = JSON.parse(vData);
    console.log('vData', vData);
    console.log('id', vData.__id);
  }

  buildChildren(children) {
    return (
      children.map((child) => {
        if (child.type === 'Text') {
          return (
            <span data-nodeid={child.__id} style={this.getStyle(child)}>
              { child.text }
            </span>
          )
        } else if (child.type === 'Image') {
          return (
            <img data-nodeid={child.__id} src={child.src} alt style={this.getStyle(child)}/>
          )
        } else {
          return (
            <div data-nodeid={child.__id} style={this.getStyle(child)}>
              {
                child.children ? this.buildChildren(child.children) : ''
              }
            </div>
          )
        }
      })
    )
  }

  getStyle(child) {
    let retObj = {
      height: `${child.frame.height}px`,
      zIndex: child.zIndex,
      boxSizing: 'border-box',
      // wordBreak: 'keep-all',
      // whiteSpace: 'nowrap'
    };
    if (!!Object.keys(child.style).length) {
      const styleObj = child.style;
      retObj = {...retObj, ...styleObj};      
      console.log('child.style', retObj);
    }
    if (child.type === 'View') {
      const layoutObj = {
        position: 'absolute', 
        left: `${child.frame.left}px`, 
        top: `${child.frame.top}px`,  
        width: `${child.frame.width}px`, 
      }
      retObj = {...retObj, ...layoutObj};
    }

    if (child.type !== 'View') {
      // 只要frame中有一项不为0，则进行绝对定位
      const isAbs = Object.values(child.frame).some((item) => item !== 0);
      if (isAbs) {
        const layoutObj = {
          position: 'absolute', 
          left: `${child.frame.left}px`, 
          top: `${child.frame.top}px`,  
        };
        retObj = {...retObj, ...layoutObj};
      }
    }
    return retObj;
  }

  render() {
    return (
      <div className="viewport-wrapper">
        {
          <div 
            data-nodeid={vData.__id}
            style={{ 
              position: 'relative', 
              width: `${vData.frame.width}px`, 
              height: `${vData.frame.height}px`, 
              outline: `1px solid #ccc`,
              zIndex: vData.zIndex
            }}>
            {
              this.buildChildren(vData.children)
            }
          </div>
        }
      </div>
    );
  }
}

export default Viewport;
