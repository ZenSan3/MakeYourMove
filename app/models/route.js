import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/makeyourmove");
const Route = mongoose.model("Route", {user: String, StationA: String, StationB: String, dateOfDeparture: Date, dateOfCreation: Date});

export default Route;