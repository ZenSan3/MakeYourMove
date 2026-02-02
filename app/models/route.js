import mongoose from "mongoose";
const {Schema, SchemaTypes} = mongoose;
mongoose.connect("mongodb://localhost:27017/makeyourmove");
const SchemaRoute = new Schema({
    user: {type: String, required: true},
    stationA: {type: String, required: true},
    stationB: {type: String, required: true},
    dateOfDeparture: {type: Date, required: true},
    dateOfCreation: {type: Date, default: Date.now}
});
const Route = mongoose.model("Route", SchemaRoute);

export default Route;