import React, { Component } from "react";
import "../styles/room.scss";
import { ROOM_COLOR } from "../../constants/RoomConstant";

export default class RoomView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <g onClick={this.props.onClick} className="roomview">
        <path d={this.props.d} className={this.props.isVisible ? this.props.color : ROOM_COLOR.WHITE} />
        <text
          x={this.props.x}
          y={this.props.y}
          transform={this.props.transform}
          className="room-text"
        >
          {this.props.text}
        </text>
      </g>
    );
  }
}
