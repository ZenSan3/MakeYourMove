import mongoose from "mongoose";
const {Schema, SchemaTypes} = mongoose;
mongoose.connect("mongodb://localhost:27017/makeyourmove");
const SchemaUsers = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    pwd: {type: String, required: true},
    role: {type: String, default: "Default"},
    disability: {type: Boolean, default: false},
});
const User = mongoose.model("User", SchemaUsers);

export default User;