import React, { Component } from "react";
import "../styles/dashboardview.scss";
import FloorplanView from "./FloorplanView";
import GraphView from "./GraphView";
import ControlView from "./ControlView";

export default class DashboardView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  updateDateTime = (startDateTime, endDateTime) => {
    this.controlView.updateStartDateTime(startDateTime);
    this.controlView.updateEndDateTime(endDateTime);
  }

  updateRoomColor = (roomId, color) => {
    this.floorplanView.updateRoomColor(roomId, color);
  }

  updateGraph = (graphData) => {
    this.graphView.populateGraph(graphData);
  }

  updateGraphWithTemperatureRange = (graphData, temperatureRange) => {
    this.graphView.populateGraphWithTemperatureRange(graphData, temperatureRange);
  }

  updateGraphVisibilityForRoom = (roomIndex, isVisible) => {
    this.graphView.setVisibilityOfLinePlotForRoom(roomIndex, isVisible);
  }

  render() {
    return (
      <div className="dashboardview">
        <h1 className="dashboardview-title">
          Temperature Monitoring Dashboard
        </h1>
        <ControlView onRef={ref => (this.controlView = ref)} 
                     onChangeStartDateTime={this.props.onChangeStartDateTime}
                     onChangeEndDateTime={this.props.onChangeEndDateTime}
                     onChangeMaxSamples={this.props.onChangeMaxSamples}
        />
        <div className="dashboardview-graphics-container">
          <GraphView onRef={ref => (this.graphView = ref)} 
                     onInteractWithGraph={this.props.onInteractWithGraph}
                     onResetZoom={this.props.onResetZoom}
          />
          <FloorplanView onRef={ref => (this.floorplanView = ref)}
                         onToggleRoomVisibility={this.props.onToggleRoomVisibility} 
          />
        </div>
      </div>
    );
  }
}
