import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

export default class DashboardPresenter {
  constructor(view, model) {
    this._view = view;
    this._model = model;

    this.toggleRoomSelection = this.toggleRoomSelection.bind(this);

    this.presenterMethods = {
      toggleRoomSelection: this.toggleRoomSelection
    }

    Meteor.startup(() => {
      render(<this._view presenterMethods={this.presenterMethods}/>, document.getElementById("react-target"));
    });

    this.toggleRoomSelection();
  }

  toggleRoomSelection = () => {
    this._model.updateRoomSelection();
  }
}
