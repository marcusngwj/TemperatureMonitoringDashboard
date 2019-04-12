import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

export default class DashboardPresenter {
  constructor(view, model) {
    this._view = view;
    this._model = model;

    Meteor.startup(() => {
      render(<this._view onChangeStartDateTime={this.changeStartDateTime}
                         onChangeEndDateTime={this.changeEndDateTime}
                         onChangeMaxSamples={this.changeMaxSamples}
                         onToggleRoom={this.toggleRoomSelection}
             />, document.getElementById("react-target"));
    });
  }

  changeStartDateTime = (dateTime) => {
    this._model.updateStartDateTime(dateTime);
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
}
