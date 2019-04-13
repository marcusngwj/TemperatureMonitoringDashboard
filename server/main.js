import { Meteor } from "meteor/meteor";
import { temperatureData } from "../startup/temperatureData";
import Papa from "papaparse";
import moment from 'moment';

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


function sortData(betweenData, numSamples) {
  //Data received is of the following format now: timstamp + array
  //Obtain random data
  //Get the start and the end with

  var roomList = [[], [], [], [], [], [], []];
  //To-do
  if (numSamples >= betweenData.length) {
    let graphFriendlyDataList = [];

    for (i = 0; i < betweenData.length; i++) {
      var numData = betweenData[i].value.length;
      var currentTimestamp = betweenData[i].timestamp;
      let timestampAndTemperatures = ["","","","","","",""];

      for (j = 0; j < numData; j++) {
        var currentValue = betweenData[i].value[j];
        var splitValue = currentValue.split(",");
        var currentRoomid = splitValue[0];
        var currentTemperature = splitValue[1];
        var stringToPush = currentTimestamp.toISOString() + "," + currentTemperature;
        roomList[parseInt(currentRoomid)].push(stringToPush);

        timestampAndTemperatures[currentRoomid] = currentTemperature.toString();
      }
      graphFriendlyDataList.push(moment(currentTimestamp).format('YYYY-MM-DD HH:mm')+","+timestampAndTemperatures.toString()+"\n");
    }
    return [roomList, graphFriendlyDataList];
  } 
  else {
    return getRandomizedSample(betweenData, numSamples);
  }
}

function getRandomizedSample(betweenData, numSamples) {
  var roomList = [[], [], [], [], [], [], []];
  //get the first timestamp and the last timestamp
  if (numSamples == 1) {
    let graphFriendlyDataList = [];
    let timestampAndTemperatures = ["","","","","","",""];
    var firstData = betweenData[0];

    for (m = 0; i < firstData.value.length; i++) {
      var currentValue = firstData.value[m];
      var splitValue = currentValue.split(",");
      var currentRoomid = splitValue[0];
      var currentTemperature = splitValue[1];
      var stringToPush = firstDataTimestamp.toISOString() + "," + currentTemperature;
      roomList[parseInt(currentRoomid)].push(stringToPush);
      timestampAndTemperatures[currentRoomid] = currentTemperature.toString();
    }
    graphFriendlyDataList.push(moment(firstDataTimestamp).format('YYYY-MM-DD HH:mm')+","+timestampAndTemperatures.toString()+"\n");
    return [roomList, graphFriendlyDataList];
  }

  var firstData = betweenData[0];
  var lastData = betweenData[betweenData.length - 1];

  var firstDataTimestamp = betweenData[0].timestamp;
  var lastDataTimestamp = betweenData[betweenData.length - 1].timestamp;

  for (i = 0; i < firstData.value.length; i++) {
    var currentValue = firstData.value[i];
    var splitValue = currentValue.split(",");
    var currentRoomid = splitValue[0];
    var currentTemperature = splitValue[1];
    var stringToPush = firstDataTimestamp.toISOString() + "," + currentTemperature;
    roomList[parseInt(currentRoomid)].push(stringToPush);
  }

  for (k = 0; k < lastData.value.length; k++) {
    var currentValue = lastData.value[k];
    var splitValue = currentValue.split(",");
    var currentRoomid = splitValue[0];
    var currentTemperature = splitValue[1];
    var stringToPush = lastDataTimestamp.toISOString() + "," + currentTemperature;
    roomList[parseInt(currentRoomid)].push(stringToPush);
  }

  var map = new Map();
  map.set(firstDataTimestamp.toISOString(), "1");
  map.set(lastDataTimestamp.toISOString(), "1");
  var numData = betweenData.length;

  var countInterval = parseInt(numData / numSamples);
  var loopIdx = 1;
  var countSamples = 1;
  // console.log("countInterval is " + countInterval);
  if (countInterval = 1) {
    countInterval = 2;
  }
  if (countInterval > 1) {
    for (idx = 1; (countSamples <= numSamples - 2); idx += countInterval) {

      if (idx >= numData && countSamples <= numSamples - 2) {
        idx = loopIdx + 1;
        loopIdx++;
      } else if (idx >= numData && countSamples > numSamples - 2) {
        break;
      }

      var currentTimestamp = betweenData[idx].timestamp;
      if (map.get(currentTimestamp.toISOString()) != "1") {
        countSamples++;
        map.set(currentTimestamp.toISOString(), "1");
        for (j = 0; j < betweenData[idx].value.length; j++) {
          var currentValue = betweenData[idx].value[j];
          var splitValue = currentValue.split(",");
          var currentRoomid = splitValue[0];
          var currentTemperature = splitValue[1];
          var stringToPush = currentTimestamp.toISOString() + "," + currentTemperature;

          roomList[parseInt(currentRoomid)].push(stringToPush);
        }
      }
    }
  }
  return [roomList, []];
}
function FindBetweenData(startDateTime, endDateTime, numSamples) {
  var startTimestamp = startDateTime;
  var endTimestamp = endDateTime;
  var betweenData = temperatureData.find({
    timestamp: {
      $gte: (new Date(startTimestamp)),
      $lt: (new Date(endTimestamp))
    }
  }).fetch()
  // console.log(betweenData);
  var sortedData = sortData(betweenData, numSamples);
  // console.log(betweenData);
  return sortedData;
}
if (Meteor.isServer) {
  Meteor.methods({
    queryData: function (startDateTime, endDateTime, numSamples) {
      var sortedData = FindBetweenData(startDateTime, endDateTime, numSamples);


      return sortedData;
    }
  });
}