import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    mobileNo: {
      type: String,
      required: [true, "Please provide phone number"],
      unique: true,
      validate: {
        validator: function (v) {
          return v.length === 12;
        },
        message: (props) => `${props.value} is not a valid phone number.`,
      },
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select:false
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin", "SuperAdmin"],
    },
  },
  { timestamps: true }
);
export const User = mongoose.models.User || mongoose.model("user", userModel);
