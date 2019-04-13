import { Meteor } from "meteor/meteor";
import { Promise } from 'meteor/promise';
import { ROOM_COLOR } from "../constants/RoomConstant";

export default class DashboardModel {
  constructor() {
    this.startDateTime = "2013-01-01T05:00:00Z";
    this.endDateTime = "2013-12-12T05:00:00Z";
    this.roomVisibilityList = [true, true, true, true, true, true, true];
    this.roomModels = [];
    this.colorList = [];
    this.averageTempList = [];
    this.result = this.queryRoom(this.startDateTime, this.endDateTime, "both");
    // console.log("here");
    // console.log(this.result);
    // this.colorList = this.calculateRoomColor(this.result);
    this.updateRoomVisibility = this.updateRoomVisibility.bind(this);
  }

  setCallbacks = (notifyRoomsVisibilityChanged, notifyRoomsColorChanged) => {
    this.notifyRoomsVisibilityChanged = notifyRoomsVisibilityChanged;
    this.notifyRoomsColorChanged = notifyRoomsColorChanged;
  }

  updateStartDateTime = (dateTime) => {
    console.log("Start Time: " + dateTime.toISOString())
    this.queryRoom(dateTime.toISOString(), null, "start");
    console.log(this.averageTempList);
    this.notifyRoomsColorChanged(this.colorList);
  }

  updateEndDateTime = (dateTime) => {
    console.log("End Time: " + dateTime.toISOString())
    this.queryRoom(dateTime.toISOString(), null, "end");
    this.notifyRoomsColorChanged(this.colorList);
  }

  updateMaxSamples = (numSamples) => {
    console.log("Num Samples chosen: " + numSamples);
  }

  // RoomIndex != roomId. RoomIndex is just the number
  updateRoomVisibility = (roomIndex) => {
    this.roomVisibilityList[roomIndex] = !this.roomVisibilityList[roomIndex];
    this.notifyRoomsVisibilityChanged(this.roomVisibilityList);
  }

  queryRoom = async (initial, end, point) => {
    if (Meteor.isClient) {
      if (point === "start") {
        this.startDateTime = initial;
      } else if (point === "end") {
        this.endDateTime = end;
      } else {
        this.startDateTime = initial;
        this.endDateTime = end;
      }
      var numSamples = 8000;
      let promise = new Promise((resolve, reject) => {
        Meteor.call("queryData", this.startDateTime, this.endDateTime, numSamples, (err, res) => {
          if (err) reject('Something went wrong');
          setTimeout(() => resolve(res), 2000);
        });
      });
      let result = await promise;
      this.averageTempList = this.calculateAverageTemperature(result);
      this.colorList = this.calculateColor(this.averageTempList);
      return result;
    }
  }

  calculateAverageTemperature = (result) => {

    var averageTempList = [];

    for (let i = 0; i < result.length; i++) {
      var currentTempSum = 0;
      for (let j = 0; j < result[i].length; j++) {
        let currIdx = result[i][j];
        let splitStr = currIdx.split(",");
        let currTime = splitStr[0];
        let currTemp = splitStr[1];
        currentTempSum += parseFloat(currTemp);
      }
      averageTempList[i] = (currentTempSum / result[i].length);
    }

    return averageTempList;
  }

  getSpecificRoomIdAverageTemperature = (roomId) => {
    return this.averageTempList[roomId];
  }

  calculateColor = (averageTempList) => {
    let colorList = [];
    for (let i = 0; i < averageTempList.length; i++) {
      if (averageTempList[i] <= 15) {
        colorList[i] = ROOM_COLOR.DARK_BLUE;
      } else if (averageTempList[i] <= 20) {
        colorList[i] = ROOM_COLOR.LIGHT_BLUE;
      } else if (averageTempList[i] <= 25) {
        colorList[i] = ROOM_COLOR.GREY;
      } else {
        colorList[i] = ROOM_COLOR.RED
      }
    }
    return colorList;
  }

}