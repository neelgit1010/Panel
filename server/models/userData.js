const { Schema, model } = require("mongoose");

const UserDataSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  }
});

module.exports = model("UserData", UserDataSchema);