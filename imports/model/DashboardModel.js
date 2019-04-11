export default class DashboardModel {
  constructor() {
    this.selectedRooms = [true, true, true, true, true, true, true];
    this.roomModels = [];

    this.updateRoomSelection = this.updateRoomSelection.bind(this);
  }

  updateRoomSelection = () => {
    console.log("I am from model");
  }
}