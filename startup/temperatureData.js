import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

td = new Mongo.Collection("temperatureData");
td.schema = new SimpleSchema({
  timestamp: { type: String },
  value: { type: Array },

  "value.$": Object
  // timestamp: { type: String },
  // temperature: { type: String }
});

export { td as temperatureData };
