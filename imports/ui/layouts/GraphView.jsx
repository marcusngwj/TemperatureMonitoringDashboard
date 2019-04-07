import React, { Component } from 'react';
import Dygraph from 'dygraphs';
import '../styles/graph.scss';

// Incorporating Dygraph into react: https://stackoverflow.com/a/44616600
export default class GraphView extends Component {
  componentDidMount() {
    var data =  `X,Y,Z
    1,0,3
    2,2,6
    3,4,8
    4,6,9
    5,8,9
    6,10,8
    7,12,6
    8,14,3`;

    //  See options: http://dygraphs.com/options.html
    new Dygraph(this.refs.dygraph, data, {
      height: 350,
      width: 1000,
      animatedZooms: true,
    });
  }

  render() {
    return (
      <div className="graphview" ref="dygraph"></div>
    );
  }
}