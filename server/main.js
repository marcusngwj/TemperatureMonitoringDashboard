import { Meteor } from "meteor/meteor";
import { temperatureData } from "../startup/temperatureData";
import Papa from "papaparse";

Meteor.startup(() => {
  if (temperatureData.find().count() === 0) {
    //Do Data insertion
    console.log("Initializing Data");
    initializeTable();
    console.log("Initialized Data");
  }
});

function initializeTable() {
  //Parse from csv
  var fs = require("fs");
  var file = "../../../../../data/room-temperatures.csv";
  var content = fs.readFileSync(file, "utf8");
  var rows;
  Papa.parse(content, {
    header: true,
    delimiter: ",",
    complete: function (results) {
      rows = results.data;
    }
  });
  //Insetion into mongoDb
  for (i = 0; i < rows.length; i++) {
    var currRoomId = rows[i].RoomId;
    var currTimestamp = rows[i].timestamp;
    var currTemperature = rows[i].temperature;
    //Insertion algorithm:
    //1)If the timestamp cannot be found, simply insert timestamp + array
    //2)If the timestamp is found, $push the array in

    var results = temperatureData.find({ timestamp: new Date(currTimestamp) }).fetch();
    if (results.length == 0) {
      //If timestamp cannot be found, simply insert
      insertData(currRoomId, currTimestamp, currTemperature);
    } else {
      //If timestamp is found, simply update
      updateData(currRoomId, currTimestamp, currTemperature);
    }
  }
}
function insertData(currRoomId, currTimestamp, currTemperature) {
  var valueData = currRoomId + "," + currTemperature;
  temperatureData.insert({
    timestamp: new Date(currTimestamp),
    value: [valueData]
  });
}
function updateData(currRoomId, currTimestamp, currTemperature) {
  //   console.log("here");
  var valueData = currRoomId + "," + currTemperature;
  temperatureData.update(
    { timestamp: new Date(currTimestamp) },
    { $push: { value: valueData } }
  );
}

function getData(startDate, endDate, startTime, endTime, numSamples) { }


function FindBetweenData(startDate, endDate, startTime, endTime) {
  var startTimestamp = startDate + "T" + endTime + "Z";
  var endTimestamp = endDate + "T" + endTime + "Z";
  var betweenData = temperatureData.find({
    timestamp: {
      $gte: Date(new Date(startTimestamp)),
      $lt: Date(new Date(endTimestamp))
    }
  })
  console.log("test");
  //console.log(betweenData);
  return betweenData;
}
if (Meteor.isServer) {
  Meteor.methods({
    queryData: function (startDate, endDate, startTime, endTime, numSamples) {
      console.log(startDate);
      var requiredData = FindBetweenData(startDate, endDate, startTime, endTime);
      var startTimestamp = startDate + "T" + endTime + "Z";
      var endTimestamp = endDate + "T" + endTime + "Z";
      console.log("startTimeStamp is " + startTimestamp);
      console.log("endTimeStamp is " + endTimestamp);
      var betweenData = temperatureData.find({
        timestamp: {
          $gte: (new Date(startTimestamp)),
          $lt: (new Date(endTimestamp))
        }
      }).fetch();
      // console.log("test");
      console.log(betweenData);
      return "test";
      // return betweenData;
      // return requiredData;
    }
  });
}