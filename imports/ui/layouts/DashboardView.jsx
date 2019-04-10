import React, { Component } from "react";
import "../styles/dashboardview.scss";
import FloorplanView from "./FloorplanView";
import GraphView from "./GraphView";
import ControlView from "./ControlView";
import DashboardPresenter from "../../presenter/DashboardPresenter";

export default class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.toggleVisiblity = this.toggleVisibility.bind(this);
  }
  toggleVisibility(room, currentVisiblity) {
    // console.log(room);
    // console.log(currentVisiblity);
    //Bubble up to DashBoardPresenter then toggle visibility
  }

  render() {
    return (
      <div className="dashboardview">
        <h1 className="dashboardview-title">
          Temperature Monitoring Dashboard
        </h1>
        <ControlView />
        <div className="dashboardview-graphics-container">
          <GraphView />
          <FloorplanView toggleVisiblity={this.toggleVisiblity} />
        </div>
      </div>
    );
  }
}
