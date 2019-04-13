import React, { Component } from 'react';
import Dygraph from 'dygraphs';
import '../styles/graphview.scss';

// Incorporating Dygraph into react: https://stackoverflow.com/a/44616600
// Dygraph API: http://dygraphs.com/jsdoc/symbols/Dygraph.html
export default class GraphView extends Component {
  componentDidMount() {
    this.props.onRef(this);

    var data =  `Date, Room0, Room1, Room2, Room3, Room4, Room5, Room6
    2013-10-01 00:00,0.0,10.5,20.2,30.0,14.2,15.5,26.7
    2013-10-02 00:00,12.9,14.5,26.2,28.8,10.9,12.2,14.7
    2013-10-03 00:00,24.7,28.2,12.8,16.2,20.1,24.4,28.6
    2013-10-04 00:00,26.3,12.2,18.7,24.9,30.0,24.2,18.4
    2013-10-05 00:00,28.1,16.3,24.5,24.7,16.2,18.9,16.0
    2013-10-06 00:00,10.5,20.1,30.0,20.3,10.2,0.0,10.2
    2013-10-07 00:00,12.5,14.4,16.9,18.0,20.2,22.7,24.8
    2013-10-08 00:00,14.3,16.7,18.3,20.2,22.1,24.6,26.9`;

    //  See options: http://dygraphs.com/options.html
    this.dygraph = new Dygraph(this.refs.dygraph, data, {
      height: 430,
      width: 600,
      animatedZooms: true,
      legend: 'always',
      labelsDiv: this.refs.legend,
      hideOverlayOnMouseOut: false,
      xlabel: "Date",
      ylabel: "Temperature / °C",
      zoomCallback: this.interactWithGraph,
    });
  }

  interactWithGraph = () => {
    let startDateTime = this.dygraph.xAxisRange()[0];
    let endDateTime = this.dygraph.xAxisRange()[1];
    this.props.onInteractWithGraph(startDateTime, endDateTime);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  updateGraph = () => {
    console.log("Inside graphview");
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