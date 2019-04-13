import { Meteor } from "meteor/meteor";
export default class DashboardModel {
  constructor() {
    this.selectedRooms = [true, true, true, true, true, true, true];
    this.roomModels = [];
    this.startDateTime = "2013-01-01T05:00:00Z";
    this.endDateTime = "2013-12-12T05:00:00Z";
    this.queryRoom(this.startDateTime, this.endDateTime, "both")
    this.updateRoomSelection = this.updateRoomSelection.bind(this);
  }

  updateStartDateTime = (dateTime) => {
    console.log("Model is updating Start Date Time...");
    console.log(dateTime.toISOString())
    this.queryRoom(dateTime.toISOString(), null, "start");
  }

  updateEndDateTime = (dateTime) => {
    console.log("Model is updating End Date Time...");
    console.log(dateTime.toISOString())
    this.queryRoom(dateTime.toISOString(), null, "end");
  }

  updateMaxSamples = () => {
    console.log("Model is updating Max Samples...");
  }

  updateRoomSelection = () => {
    console.log("Model is updating room selection...");
  }

  queryRoom = (initial, end, point) => {
    if (Meteor.isClient) {
      if (point === "start") {
        console.log("start");
        this.startDateTime = initial;
      } else if (point === "end") {
        this.endDateTime = end;
        console.log("end");
      } else {
        this.startDateTime = initial;
        this.endDateTime = end;
        console.log("both");
      }
      // console.log("currnetstart is " + this.startDateTime);
      // console.log("currentEnd is " + this.endDateTime);
      var numSamples = 5000;
      Meteor.call("queryData",
        this.startDateTime, this.endDateTime, numSamples,
        function (error, result) {
          if (error) {
            console.log(error);
          } else {
            console.log("queryData result is: " + result);
            console.log("query data size is " + result.length);
          }
        }
      );
    }
  }
}


// if (Meteor.isClient) {
//   // var startDate = "2013-10-02";
//   // var endDate = "2013-10-03";
//   // var startTime = "05:00:00";
//   // var endTime = "05:30:00";
//   // var numSamples = 1000;
//   Template.main.events({
//     // events go here
//     'click .filter': function (startDate, endDate, startTime, endTime, numSamples) {
//       Meteor.call("queryData",
//         startDate, endDate, startTime, endTime, numSamples,
//         function (error, result) {
//           if (error) {
//             console.log(error);
//           } else {
//             console.log("queryData result is: " + result);
//             // return result;
//           }
//         }
//       );
//     }
//   });
// }

