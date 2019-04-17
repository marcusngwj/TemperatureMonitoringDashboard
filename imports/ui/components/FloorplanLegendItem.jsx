import React, { Component } from "react";
import "../styles/floorplanlegenditemstyle.scss";

export default class FloorplanLegendItem extends Component {
  render() {
    return (
      <div className="floorplanlegenditem-main">
        <div className={this.props.color}></div>
        <span className="legend-text">{this.props.text}</span>
      </div>
    );
  }
}
