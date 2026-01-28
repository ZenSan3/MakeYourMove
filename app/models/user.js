import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/makeyourmove");
const User = mongoose.model("User", {username: String, email: String, pwd: String, role: Number, disability: Boolean});

export default User;