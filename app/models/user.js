import mongoose from "mongoose";
import 'dotenv/config'; 
const {Schema, SchemaTypes} = mongoose;
mongoose.connect(process.env.Mongo);
const SchemaUsers = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    pwd: {type: String, required: true},
    role: {type: String, default: "Default"},
    disability: {type: Boolean, default: false},
});
const User = mongoose.model("User", SchemaUsers);

export default User;