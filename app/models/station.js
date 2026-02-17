import mongoose from "mongoose";
import 'dotenv/config'; 
const {Schema, SchemaTypes} = mongoose;
mongoose.connect(process.env.Mongo);
const StationSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    CAP: {type: Number, required: true}
});
const Station = mongoose.model("Station", StationSchema);

export default Station;