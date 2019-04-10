import React, { Component } from "react";
import "../styles/room.scss";

export default class RoomView extends Component {
  constructor(props, defaultColor) {
    super(props);
    this.state = { isToggleOn: true };

    this.defaultColor = "red";
    this.handleOnClick = this.handleOnClick.bind(this);
    // this.setRoomColor = this.setRoomColor.bind(this);
    //this.setRoomVisiblity = this.setRoomVisiblity.bind(this);
  }
  handleOnClick = () => {
    //Sends Notification to Presenter to 'hide' the graph
    console.log("state is " + this.state.roomColor);
    this.setState(state => ({
      isToggleOn: !state.isToggleOn,
      roomColor: "white"
    }));
  };
  // setRoomColor = newRoomColor => {
  //   this.setState(state => ({
  //     isToggleOn: !state.isToggleOn,
  //     roomColor: newRoomColor
  //   }));
  // };
  //setRoomVisiblity = () => {};
  render() {
    return (
      <g onClick={this.handleOnClick} className="room">
        {this.state.isToggleOn ? "ON" : "OFF"}
        <path d={this.props.d} fill={this.state.roomColor} />

        {this.props.setRoomVisibility(this.props.id, this.state.isToggleOn)}
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
