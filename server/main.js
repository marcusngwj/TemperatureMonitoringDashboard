import { Meteor } from "meteor/meteor";
import { temperatureData } from "../startup/temperatureData";
import Papa from "papaparse";

Meteor.startup(() => {
  if (temperatureData.find().count() === 0) {
    //Do Data insertion
    console.log("Initializing Data");
    initializeTable();
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
    complete: function(results) {
      //console.log("Finished:", results.data);
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

    var results = temperatureData.find({ timestamp: currTimestamp }).fetch();
    if (results.length == 0) {
      //If timestamp cannot be found, simply insert
      insertData(currRoomId, currTimestamp, currTemperature);
      //   console.log("is empty");
    } else {
      //If timestamp is found, simply update
      updateData(currRoomId, currTimestamp, currTemperature);
      //   console.log(results);
    }
  }
}
function insertData(currRoomId, currTimestamp, currTemperature) {
  var valueData = currRoomId + "," + currTemperature;
  temperatureData.insert({
    timestamp: currTimestamp,
    value: [valueData]
  });
}
function updateData(currRoomId, currTimestamp, currTemperature) {
  //   console.log("here");
  var valueData = currRoomId + "," + currTemperature;
  temperatureData.update(
    { timestamp: currTimestamp },
    { $push: { value: valueData } }
  );
}

Meteor.methods({
  queryData({ currStartDate, currEndDate, currStartTime, currEndTime }) {}
});
console.log(splitup[1]);
