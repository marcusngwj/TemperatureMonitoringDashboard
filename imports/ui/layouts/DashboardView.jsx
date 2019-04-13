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

  updateRoomColor = (roomId, color) => {
    this.floorplanView.updateRoomColor(roomId, color);
  }

  updateGraph = () => {
    this.graphView.updateGraph();
  }

  render() {
    return (
      <div className="dashboardview">
        <h1 className="dashboardview-title">
          Temperature Monitoring Dashboard
        </h1>
        <ControlView onChangeStartDateTime={this.props.onChangeStartDateTime}
                     onChangeEndDateTime={this.props.onChangeEndDateTime}
                     onChangeMaxSamples={this.props.onChangeMaxSamples}
        />
        <div className="dashboardview-graphics-container">
          <GraphView onRef={ref => (this.graphView = ref)} 
                     onInteractWithGraph={this.props.onInteractWithGraph}
          />
          <FloorplanView onRef={ref => (this.floorplanView = ref)}
                         onToggleRoomSelection={this.props.onToggleRoomSelection} 
          />
        </div>
      </div>
    );
  }
}
