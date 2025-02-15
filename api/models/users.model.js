import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["usuario", "administrador"], 
    default: "usuario", 
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = model("User", userSchema, "users");

export default User;
