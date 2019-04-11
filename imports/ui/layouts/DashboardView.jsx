import React, { Component } from "react";
import "../styles/dashboardview.scss";
import FloorplanView from "./FloorplanView";
import GraphView from "./GraphView";
import ControlView from "./ControlView";

export default class DashboardView extends Component {
  constructor(props) {
    super(props);
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
          <GraphView />
          <FloorplanView onToggleRoom={this.props.onToggleRoom} />
        </div>
      </div>
    );
  }
}
