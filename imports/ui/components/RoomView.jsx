import React, { Component } from 'react';
import '../styles/room.scss';

export default class RoomView extends Component {
  handleOnClick = () => {
    console.log(this.props.id);
  }

  render() {
    return (
      <g onClick={this.handleOnClick} className="room">
        <path d={this.props.d} className="room-background"  />
        <text x={this.props.x} y={this.props.y} transform={this.props.transform} className="room-text">{this.props.text}</text>
      </g>
    );
  }
}