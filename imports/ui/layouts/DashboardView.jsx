import React, { Component } from 'react';
import '../styles/dashboardview.scss';
import FloorplanView from './FloorplanView';
import GraphView from './GraphView';
import ControlView from './ControlView';

export default class DashboardView extends Component {
  render() {
    return (
      <div className="dashboardview">
        <h1 className="dashboardview-title">Temperature Monitoring Dashboard</h1>
        <ControlView />
        <div className="dashboardview-graphics-container">
          <GraphView />
          <FloorplanView />
        </div>
      </div>
    );
  }
}
