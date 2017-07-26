import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import logo from './logo.svg';
import './App.css';
import './Collapse.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
//import { ResponsiveReactGridLayout }       from 'react-grid-layout';
import { WidthProvider }    from 'react-grid-layout';
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
// var WidthProvider = require('react-grid-layout').WidthProvider;
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;
ResponsiveReactGridLayout = WidthProvider(ResponsiveReactGridLayout);
const originalLayouts = getFromLS('layouts') || {};
/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */

 const Card = (props) => {
  return(
   <div className='info'>
   <img width="75px" height="75px" src="https://avatars3.githubusercontent.com/u/4987847?v=4"/>
   <div>{props.name}</div>
   <div>{props.company}</div>
   </div>
  );
};

var ResponsiveLocalStorageLayout = React.createClass({
  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      className: "layout",
      breakpoints:{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
      cols: {lg: 6, md: 10, sm: 6, xs: 4, xxs: 2},
      rowHeight: 50,
      onLayoutChange: function() {},
    };
  },

  getInitialState() {
    return {
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    };
  },

  resetLayout() {
    this.setState({layouts: {}});
  },

  onLayoutChange(layout, layouts) {
    saveToLS('layouts', layouts);
    this.setState({layouts});
    this.props.onLayoutChange(layout, layouts);
  },

  render() {
    return (
      <div>
        <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
        <button onClick={this.resetLayout}>Reset Layout</button>
        <ResponsiveReactGridLayout
            ref="rrgl"
            {...this.props}
            layouts={this.state.layouts}
            onLayoutChange={this.onLayoutChange}>
          <div className="App-widget-container" key="1" data-grid={{w: 4, h: 3, x: 0, y: 0}}><span className="text"><Collapsible trigger="Start here">
        <p>This is the collapsible content. It can be any element or React component you like.</p>
        <p>It can even be another Collapsible component. Check out the next section!</p>
      </Collapsible></span></div>
          <div className="App-widget-container" key="2" data-grid={{w: 4, h: 3, x: 0, y: 0}}><span className="text">2</span></div>
          <div className="App-widget-container" key="3" data-grid={{w: 2, h: 3, x: 4, y: 0}}><span className="text">3</span></div>
          <div className="App-widget-container" key="4" data-grid={{w: 2, h: 3, x: 6, y: 0}}><span className="text">4</span></div>
          <div className="App-widget-container" key="5" data-grid={{w: 2, h: 3, x: 8, y: 0}}><span className="text">5</span></div>
        </ResponsiveReactGridLayout>
          </p>
      </div>
      </div>
    );
  }
});

module.exports = ResponsiveLocalStorageLayout;
function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
    } catch(e) {/*Ignore*/}
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem('rgl-8', JSON.stringify({
      [key]: value
    }));
  }
}



