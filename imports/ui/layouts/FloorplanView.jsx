import React, { Component } from "react";
import "../styles/floorplanview.scss";
import "../styles/room.scss";

import { ROOM_ID } from "../../constants/RoomConstant";
import RoomView from "../components/RoomView";

/**
 * SVG was draw using draw.io: https://www.draw.io/
 * SVG was minified using vecta.io: https://vecta.io/nano
 * SVG was beautified using XML Beautifier: http://xmlbeautifier.com/
 */

export default class FloorplanView extends Component {
  constructor(props) {
    super(props);
  }

  rooms = {
    [ROOM_ID[0]]: this.room0,
    [ROOM_ID[1]]: this.room1,
    [ROOM_ID[2]]: this.room2,
    [ROOM_ID[3]]: this.room3,
    [ROOM_ID[4]]: this.room4,
    [ROOM_ID[5]]: this.room5,
    [ROOM_ID[6]]: this.room6,
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  updateRoomColor = (roomId, color) => {
    this.rooms[roomId].setRoomColor(color);
  }

  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 1247 882"
        className="floorplanview"  
        width="600"
        height="430"
      >
        <RoomView d="M10.5 0h379v300h-379z" x="42" y="26" transform="translate(156.5 128.5)"
          id = {ROOM_ID[0]}
          onRef={ref => (this.rooms[ROOM_ID[0]] = ref)}
          text = "UPPER LEVEL RESIDENTIAL LOUNGE"
          onToggleVisibility = {this.props.onToggleRoomVisibility}
        />
        <RoomView d="M10 530h180v340H10z" x="31" y="19" transform="translate(67.5 685.5)"
          id = {ROOM_ID[1]}
          onRef={ref => (this.rooms[ROOM_ID[1]] = ref)}
          text = "SINGLE BEDROOM"
          onToggleVisibility = {this.props.onToggleRoomVisibility}
        />
        <RoomView d="M200 530h180v340H200z" x="31" y="19" transform="translate(257.5 685.5)"
          id = {ROOM_ID[2]}
          onRef={ref => (this.rooms[ROOM_ID[2]] = ref)}
          text = "SINGLE BEDROOM"
          onToggleVisibility = {this.props.onToggleRoomVisibility}
        />
        <RoomView d="M390 530h180v340H390z" x="31" y="19" transform="translate(447.5 685.5)"
          id = {ROOM_ID[3]}
          onRef={ref => (this.rooms[ROOM_ID[3]] = ref)}
          text = "SINGLE BEDROOM"
          onToggleVisibility = {this.props.onToggleRoomVisibility}
        />
        <RoomView d="M580 530h180v340H580z" x="31" y="19" transform="translate(637.5 685.5)"
          id = {ROOM_ID[4]}
          onRef={ref => (this.rooms[ROOM_ID[4]] = ref)}
          text = "SINGLE BEDROOM"
          onToggleVisibility = {this.props.onToggleRoomVisibility}
        />
        <RoomView d="M770 530h180v340H770z" x="31" y="19" transform="translate(827.5 685.5)"
          id = {ROOM_ID[5]}
          onRef={ref => (this.rooms[ROOM_ID[5]] = ref)}
          text = "SINGLE BEDROOM"
          onToggleVisibility = {this.props.onToggleRoomVisibility}
        />
        <RoomView d="M960 530h180v340H960z" x="31" y="19" transform="translate(1017.5 685.5)"
          id = {ROOM_ID[6]}
          onRef={ref => (this.rooms[ROOM_ID[6]] = ref)}
          text = "SINGLE BEDROOM"
          onToggleVisibility = {this.props.onToggleRoomVisibility}
        />

        <g className="outline">
          <path d="M950 880V520h21v10h-11v350z" className="C" />
          <path d="M1051 525h-80v5h80z" className="door-entrance" />
          <g className="C">
            <path
              d="M1051 525c0 44.18-35.82 80-80 80v-80"
              className="door-swing"
            />
            <path
              d="M920.75 749.25v-98.5h360v10h-350v88.5z"
              transform="rotate(90 1100.75 700)"
            />
          </g>
        </g>

        <g className="outline">
          <path d="M0 880V520h100v10H10v350z" className="C" />
          <path d="M100 525h80v5h-80z" className="door-entrance" />
          <g className="C">
            <path d="M100 525c0 44.18 35.82 80 80 80v-80" className="door-swing" />
            <path d="M10 710v-20h360v10H20v10z" transform="rotate(90 190 700)"
            />
          </g>
        </g>

        <g className="outline">
          <path d="M0 0h400v10H0z" />
          <path d="M765 480v-850h100v10h-90v840z" transform="rotate(270 815 55)" className="C" />
          <g transform="rotate(270 434.61 147.25)">
            <path d="M392.5 102.5h84.23v5H392.5z" className="door-entrance" />
            <path d="M392.5 107.5c0 46.52 37.7 84.23 84.23 84.23V107.5" className="C door-swing" />
          </g>
          <path transform="rotate(90 395 240)" d="M345 235h100v10H345z" />
          <path d="M0 290h400v10H0z" />
          <g transform="rotate(270 49.82 247.5)">
            <path d="M8 203h83.64v5H8z" className="door-entrance" />
            <path d="M91.64 208c0 46.2-37.45 83.64-83.64 83.64V208" className="C door-swing" />
          </g>
          <path transform="rotate(90 5 105)" d="M-95 100h200v10H-95z" />
          <path d="M43 388h94v5H43z" className="door-entrance" />
          <path d="M90 388v5m0 0c0 25.96-21.04 47-47 47v-47m47 0c0 25.96 21.04 47 47 47v-47" className="C door-swing" />
          <path d="M260 388h94v5h-94z" className="door-entrance" />
          <path d="M307 388v5m0 0c0 25.96-21.04 47-47 47v-47m47 0c0 25.96 21.04 47 47 47v-47" className="C door-swing" />
          <path d="M137 388h123v10H137zM0 388h42.5v10H0z" />
          <path d="M400 300v98h-45.5v-10H390v-88z" className="C" />
          <path transform="rotate(90 200 343)" d="M150 338h100v10H150z" />
          <path transform="rotate(90 5 345)" d="M-45 340H55v10H-45z" />
        </g>

        <g className="outline">
          <path d="M190 880V520h100v10h-90v350z" className="C" />
          <path d="M290 525h80v5h-80z" className="door-entrance" />
          <g className="C">
            <path d="M290 525c0 44.18 35.82 80 80 80v-80" className="door-swing" />
            <path d="M200 710v-20h360v10H210v10z" transform="rotate(90 380 700)" />
            <path d="M380 880V520h21v10h-11v350z" />
          </g>
          <path d="M481 525h-80v5h80z" className="door-entrance" />
          <g className="C">
            <path d="M481 525c0 44.18-35.82 80-80 80v-80" className="door-swing" />
            <path d="M350.75 749.25v-98.5h360v10h-350v88.5z" transform="rotate(90 530.75 700)"
            />
          </g>
        </g>

        <g className="outline">
          <path d="M570 880V520h100v10h-90v350z" className="C" />
          <path d="M670 525h80v5h-80z" className="door-entrance" />
          <g className="C">
            <path d="M670 525c0 44.18 35.82 80 80 80v-80" className="door-swing" />
            <path d="M580 710v-20h360v10H590v10z" transform="rotate(90 760 700)" />
          </g>
        </g>

        <g className="outline">
          <path d="M760 880V520h100v10h-90v350z" className="C" />
          <path d="M860 525h80v5h-80z" className="door-entrance" />
          <g className="outline">
            <path d="M860 525c0 44.18 35.82 80 80 80v-80" className="door-swing" />
            <path d="M770 710v-20h360v10H780v10z" transform="rotate(90 950 700)" />
          </g>
          <path d="M10 870h1230v10H10z" />
          <path transform="rotate(90 630 192.5)" d="M542.5 187.5h175v10h-175z" />
          <path d="M770 388h475v10H770z" />
        </g>
      </svg>
    );
  }
}
