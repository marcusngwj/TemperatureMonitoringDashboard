import React, { Component } from "react";
import "../styles/room.scss";
import { RoomColor } from "../../constants/RoomConstant";

export default class RoomView extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      color: RoomColor.RED, // To change to other color in future
      isVisible: true 
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  setColor = (newColor) => {
    this.setState({
      color: newColor
    });
  }

  handleOnClick = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });

    //TODO: Sends Notification to Presenter to 'hide' the graph
  };

  render() {
    return (
      <g onClick={this.handleOnClick} className="roomview">
        <path d={this.props.d} className={this.state.isVisible ? this.state.color : RoomColor.WHITE} />
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
