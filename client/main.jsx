import DashboardPresenter from "/imports/presenter/DashboardPresenter";
import DashboardModel from "/imports/model/DashboardModel";
import DashboardView from "/imports/ui/layouts/DashboardView";
import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { temperatureData } from "../startup/temperatureData";

dashboardModel = new DashboardModel();

dashboardPresenter = new DashboardPresenter(DashboardView, dashboardModel);

if (Meteor.isClient) {
  var startDate = "2013-10-02";
  var endDate = "2013-10-03";
  var startTime = "05:00:00";
  var endTime = "05:30:00";
  var numSamples = 40;
  Meteor.call("queryData",
    startDate, endDate, startTime, endTime, numSamples,
    function (error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log("queryData result is: " + result);
      }
    }
  );
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
