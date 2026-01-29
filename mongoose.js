import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/makeyourmove");
const Route = mongoose.model("Route", {user: String, stationA: String, stationB: String, dateOfDeparture: Date, dateOfCreation: Date});
const sonftwareEngineering = new Route({user: "Aliport", stationA: "Piazza Dante", stationB: "Povo Polo Scientifico Ovest", dateOfDeparture: new Date("2026-02-27T07:30:00"), dateOfCreation: new Date("2026-01-13T12:31:00")});
sonftwareEngineering.save().then(() => console.log('saved!'));
