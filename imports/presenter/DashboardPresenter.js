import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

export default class DashboardPresenter {
  constructor(view, model) {
    this._view = view;
    this._model = model;

    Meteor.startup(() => {
      render(<this._view onToggleRoom={this.toggleRoomSelection}/>, document.getElementById("react-target"));
    });
  }

  toggleRoomSelection = () => {
    this._model.updateRoomSelection();
  }
}
