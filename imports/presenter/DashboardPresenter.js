import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import moment from 'moment';
import { ROOM_ID, getRoomIndexFromId } from "../constants/RoomConstant";

export default class DashboardPresenter {
  constructor(view, model) {
    this._view = view;
    this._model = model;
    this._model.setCallbacks(this.notifyDateTimeChanged,
                             this.notifyRoomsVisibilityChanged,
                             this.notifyRoomsColorChanged,
                             this.notifyGraphDataChanged);

    Meteor.startup(() => {
      render(<this._view onRef={ref => (this._view = ref)}                  // To access methods from child: https://github.com/kriasoft/react-starter-kit/issues/909#issuecomment-252969542
                         onChangeStartDateTime={this.changeStartDateTime}
                         onChangeEndDateTime={this.changeEndDateTime}
                         onChangeMaxSamples={this.changeMaxSamples}
                         onToggleRoomVisibility={this.toggleRoomVisibility}
                         onInteractWithGraph={this.interactWithGraph}
                         onResetZoom={this.resetZoom}
      />, document.getElementById("react-target"));
    });
  }

  changeStartDateTime = (dateTime) => {
    this._model.updateStartDateTime(dateTime);
  }

  changeEndDateTime = (dateTime) => {
    this._model.updateEndDateTime(dateTime);
  }

  changeMaxSamples = (numSamples) => {
    this._model.updateMaxSamples(numSamples);
  }

  toggleRoomVisibility = (roomId) => {
    let roomIndex = getRoomIndexFromId(roomId);
    this._model.updateRoomVisibility(roomIndex);
  }

  interactWithGraph = (startDateTime, endDateTime, temperatureLow, temperatureHigh) => {
    this._model.updateGraphWithTemperatureRange(moment(startDateTime), moment(endDateTime), temperatureLow, temperatureHigh);
  }

  resetZoom = () => {
    this._model.updateStartEndDateTimeToBeforeZoom();
  }

  notifyDateTimeChanged = (startDateTime, endDateTime) => {
    this._view.updateDateTime(moment(startDateTime), moment(endDateTime));
  }

  notifyRoomsVisibilityChanged = (roomVisibilityList) => {
    for (let i = 0; i < roomVisibilityList.length; i++) {
      this._view.updateGraphVisibilityForRoom(i, roomVisibilityList[i]);
    }
  }

  notifyRoomsColorChanged = (colorList) => {
    for (let i = 0; i < colorList.length; i++) {
      this._view.updateRoomColor(ROOM_ID[i], colorList[i]);
    }
  }

  notifyGraphDataChanged = (graphData, temperatureRange) => {
    if (temperatureRange == null) {
      this._view.updateGraph(graphData);
    }
    else {
      this._view.updateGraphWithTemperatureRange(graphData, temperatureRange);
    }
  }
}
