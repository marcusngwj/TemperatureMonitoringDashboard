import React, { Component } from 'react';
import Dygraph from 'dygraphs';
import '../styles/graphview.scss';

// Incorporating Dygraph into react: https://stackoverflow.com/a/44616600
// Dygraph API: http://dygraphs.com/jsdoc/symbols/Dygraph.html
// Dygraph Options: http://dygraphs.com/options.html
export default class GraphView extends Component {
  componentDidMount() {
    this.props.onRef(this);
    this.dygraph = this.createDygraph("");
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  createDygraph = (data) => {
    return new Dygraph(this.refs.dygraph, data, {
      height: 430,
      width: 600,
      animatedZooms: true,
      legend: 'always',
      labels: [ "Date", "Room0", "Room1", "Room2", "Room3", "Room4", "Room5", "Room6" ],
      labelsDiv: this.refs.legend,
      hideOverlayOnMouseOut: false,
      xlabel: "Date",
      ylabel: "Temperature / °C",
      zoomCallback: this.onZoom,
      clickCallback: this.onUnzoom
    });
  }

  createDygraphWithTemperatureRange = (data, temperatureRange) => {
    return new Dygraph(this.refs.dygraph, data, {
      height: 430,
      width: 600,
      animatedZooms: true,
      legend: 'always',
      labels: [ "Date", "Room0", "Room1", "Room2", "Room3", "Room4", "Room5", "Room6" ],
      labelsDiv: this.refs.legend,
      hideOverlayOnMouseOut: false,
      xlabel: "Date",
      ylabel: "Temperature / °C",
      valueRange: temperatureRange,
      zoomCallback: this.onZoom,
      clickCallback: this.onUnzoom
    });
  }

  onZoom = () => {
    let startDateTime = this.dygraph.xAxisRange()[0];
    let endDateTime = this.dygraph.xAxisRange()[1];
    let temperatureLow = this.dygraph.yAxisRange()[0];
    let temperatureHigh = this.dygraph.yAxisRange()[1];
    this.props.onInteractWithGraph(startDateTime, endDateTime, temperatureLow, temperatureHigh);
  }

  onUnzoom = () => {
    this.props.onResetZoom();
  }

  populateGraph = (graphData) => {
    this.dygraph = this.createDygraph(graphData);
  }

  populateGraphWithTemperatureRange = (graphData, temperatureRange) => {
    this.dygraph = this.createDygraphWithTemperatureRange(graphData, temperatureRange);
  }

  setVisibilityOfLinePlotForRoom = (roomIndex, isVisible) => {
    this.dygraph.setVisibility(roomIndex, isVisible);
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