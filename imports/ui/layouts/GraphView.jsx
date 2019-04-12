import React, { Component } from 'react';
import Dygraph from 'dygraphs';
import '../styles/graphview.scss';

// Incorporating Dygraph into react: https://stackoverflow.com/a/44616600
export default class GraphView extends Component {
  componentDidMount() {
    var data =  `Date, Room0, Room1, Room2, Room3, Room4, Room5, Room6
    1,0.0,10.5,20.2,30.0,14.2,15.5,26.7
    2,12.9,14.5,26.2,28.8,10.9,12.2,14.7
    3,24.7,28.2,12.8,16.2,20.1,24.4,28.6
    4,26.3,12.2,18.7,24.9,30.0,24.2,18.4
    5,28.1,16.3,24.5,24.7,16.2,18.9,16.0
    6,10.5,20.1,30.0,20.3,10.2,0.0,10.2
    7,12.5,14.4,16.9,18.0,20.2,22.7,24.8
    8,14.3,16.7,18.3,20.2,22.1,24.6,26.9`;

    //  See options: http://dygraphs.com/options.html
    new Dygraph(this.refs.dygraph, data, {
      height: 430,
      width: 600,
      animatedZooms: true,
      legend: 'always',
      labelsDiv: this.refs.legend,
      hideOverlayOnMouseOut: false,
      xlabel: "Date",
      ylabel: "Temperature / °C"
    });
  }

  render() {
    return (
      <div className="graphview">
        <div ref="dygraph"></div>
        <div ref="legend" className="legend"></div>
      </div>
    );
  }
}