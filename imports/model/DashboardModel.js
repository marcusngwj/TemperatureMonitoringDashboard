export default class DashboardModel {
  constructor() {
    this.selectedRooms = [true, true, true, true, true, true, true];
    this.roomModels = [];

    this.updateRoomSelection = this.updateRoomSelection.bind(this);
  }
  
  updateStartDateTime = () => {
    console.log("Model is updating Start Date Time...");
  }

  updateEndDateTime = () => {
    console.log("Model is updating End Date Time...");
  }

  updateMaxSamples = () => {
    console.log("Model is updating Max Samples...");
  }

  updateRoomSelection = () => {
    console.log("Model is updating room selection...");
  }

}
