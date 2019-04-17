import { Meteor } from "meteor/meteor";
import { Promise } from 'meteor/promise';
import { ROOM_COLOR } from "../constants/RoomConstant";

export default class DashboardModel {
  constructor() {
    this.startDateTime = "2013-10-01T05:00:00Z";
    this.endDateTime = "2013-10-12T05:00:00Z";
    this.startDateTimeBeforeZoom = this.startDateTime;
    this.endDateTimeBeforeZoom = this.endDateTime;
    this.roomVisibilityList = [true, true, true, true, true, true, true];
    this.roomModels = [];
    this.colorList = [];
    this.averageTempList = [];
    this.numSamples = 1000;
    this.result = this.queryRoom(this.startDateTime, this.endDateTime, "both", null);
  }

  setCallbacks = (notifyDateTimeChanged, notifyRoomsVisibilityChanged, notifyRoomsColorChanged, notifyGraphDataChanged) => {
    this.notifyDateTimeChanged = notifyDateTimeChanged;
    this.notifyRoomsVisibilityChanged = notifyRoomsVisibilityChanged;
    this.notifyRoomsColorChanged = notifyRoomsColorChanged;
    this.notifyGraphDataChanged = notifyGraphDataChanged;
  }

  updateStartDateTime = (dateTime) => {
    this.queryRoom(dateTime.toISOString(), null, "start", null);
    this.startDateTimeBeforeZoom = dateTime.toISOString();
  }

  updateEndDateTime = (dateTime) => {
    this.queryRoom(null, dateTime.toISOString(), "end", null);
    this.endDateTimeBeforeZoom = dateTime.toISOString();
  }

  updateGraphWithTemperatureRange = (startDateTime, endDateTime, temperatureLow, temperatureHigh) => {
    let temperatureRange = [temperatureLow, temperatureHigh];
    this.queryRoom(startDateTime.toISOString(), endDateTime.toISOString(), "both", temperatureRange);
  }

  updateStartEndDateTimeToBeforeZoom = () => {
    this.queryRoom(this.startDateTimeBeforeZoom, this.endDateTimeBeforeZoom, "both", null);
  }

  updateMaxSamples = (numSamples) => {
    this.numSamples = numSamples;
    this.queryRoom(this.startDateTime, this.endDateTime, "both", null);
  }

  // RoomIndex != roomId. RoomIndex is just the number
  updateRoomVisibility = (roomIndex) => {
    this.roomVisibilityList[roomIndex] = !this.roomVisibilityList[roomIndex];
    this.notifyRoomsVisibilityChanged(this.roomVisibilityList);
  }

  queryRoom = async (initial, end, point, temperatureRange) => {
    if (Meteor.isClient) {
      if (point === "start") {
        this.startDateTime = initial;
      } else if (point === "end") {
        this.endDateTime = end;
      } else {
        this.startDateTime = initial;
        this.endDateTime = end;
      }

      let promise = new Promise((resolve, reject) => {
        Meteor.call("queryData", this.startDateTime, this.endDateTime, this.numSamples, (err, res) => {
          if (err) reject('Something went wrong');
          setTimeout(() => resolve(res), 100);
        });
      });
      let result = await promise;

      let dataForCalculation = result[0];
      let dataForGraph = result[1];

      this.averageTempList = this.calculateAverageTemperature(dataForCalculation);
      this.colorList = this.calculateColor(this.averageTempList);
      this.notifyGraphDataChanged(dataForGraph, temperatureRange);
      this.notifyRoomsColorChanged(this.colorList);
      this.notifyDateTimeChanged(this.startDateTime, this.endDateTime);
      this.notifyRoomsVisibilityChanged(this.roomVisibilityList);
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
      }
      else if (averageTempList[i] <= 20) {
        colorList[i] = ROOM_COLOR.MEDIUM_BLUE;
      }
      else if (averageTempList[i] <= 25) {
        colorList[i] = ROOM_COLOR.LIGHT_BLUE;
      }
      else if (averageTempList[i] > 25) {
        colorList[i] = ROOM_COLOR.RED;
      }
      else {
        colorList[i] = ROOM_COLOR.GREY
      }
    }
    return colorList;
  }

}