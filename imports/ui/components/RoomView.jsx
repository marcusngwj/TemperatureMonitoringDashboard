import React, { Component } from "react";
import "../styles/room.scss";
import { ROOM_COLOR } from "../../constants/RoomConstant";

export default class RoomView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: ROOM_COLOR.DARK_BLUE,
      isVisible: true
    }
  }

  handleOnClick = (e) => {
    this.setState({
      isVisible: !this.state.isVisible
    });
    this.props.onClick(this.props.id);
  }

  render() {
    return (
      <g onClick={this.handleOnClick} className="roomview">
        <path d={this.props.d} className={this.state.isVisible ? this.state.color : ROOM_COLOR.WHITE} />
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
