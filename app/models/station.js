import mongoose from "mongoose";
const {Schema, SchemaTypes} = mongoose;
mongoose.connect("mongodb://localhost:27017/makeyourmove");
const StationSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, default: "Trento"},
    CAP: {type: Number, required: true}
});
const Station = mongoose.model("Station", StationSchema);

export default Station;