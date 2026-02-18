import mongoose from "mongoose";
import 'dotenv/config'; 
const {Schema, SchemaTypes} = mongoose;
mongoose.connect(process.env.Mongo);
const SchemaRoute = new Schema({
    user: {type: String, required: true},
    stationA: {type: String, required: true},
    stationB: {type: String, required: true},
    dateOfDeparture: {type: Date, required: true},
    status: {type: String, default: "Pending"},
    dateOfCreation: {type: Date, default: Date.now}
});
const Route = mongoose.model("Route", SchemaRoute);

export default Route;