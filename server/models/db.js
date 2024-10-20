const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
