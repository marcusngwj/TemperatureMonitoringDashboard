export default class DashboardModel {
  constructor() {
    this.selectedRooms = [true, true, true, true, true, true, true];
    this.roomModels = [];

    this.updateRoomSelection = this.updateRoomSelection.bind(this);
  }
  
  updateStartDateTime = (dateTime) => {
    console.log("Model is updating Start Date Time...");
    console.log(dateTime);
  }

  updateEndDateTime = (dateTime) => {
    console.log("Model is updating End Date Time...");
    console.log(dateTime);
  }

  updateMaxSamples = () => {
    console.log("Model is updating Max Samples...");
  }

  updateRoomSelection = () => {
    console.log("Model is updating room selection...");
  }

}
