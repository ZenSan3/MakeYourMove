import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/makeyourmove");
const Station = mongoose.model("Station", {name: String, address: String, city: String, CAP: Number});

export default Station;