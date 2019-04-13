import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import moment from 'moment';

export default class DashboardPresenter {
  constructor(view, model) {
    this._view = view;
    this._model = model;

    Meteor.startup(() => {
      render(<this._view onRef={ref => (this._view = ref)}                  // To access methods from child: https://github.com/kriasoft/react-starter-kit/issues/909#issuecomment-252969542
                         onChangeStartDateTime={this.changeStartDateTime}
                         onChangeEndDateTime={this.changeEndDateTime}
                         onChangeMaxSamples={this.changeMaxSamples}
                         onToggleRoom={this.toggleRoomSelection}
                         onInteractWithGraph={this.interactWithGraph}
             />, document.getElementById("react-target"));
    });
  }

  changeStartDateTime = (dateTime) => {
    this._model.updateStartDateTime(dateTime);
    this._view.updateRoomColor("room0", "room-background-red"); // To be called in model. Move it to model
  }

  changeEndDateTime = (dateTime) => {
    this._model.updateEndDateTime(dateTime);
  }

  changeMaxSamples = () => {
    this._model.updateEndDateTime();
  }

  toggleRoomSelection = () => {
    this._model.updateRoomSelection();
  }

  interactWithGraph = (startDateTime, endDateTime) => {
    // TODO: Change the startdate in model
    // TODO: Change end date in model
    console.log(moment(startDateTime), moment(endDateTime));
  }
}
