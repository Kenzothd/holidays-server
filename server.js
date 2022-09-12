require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const log = require("debug")("holidays:server");
const morgan = require("morgan");
const cors = require("cors");

//config
const app = express();
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/test";
const PORT = process.env.PORT ?? 3300;
mongoose.connect(MONGO_URI, {}, () => {
  console.log("the connection with mongodb is established");
}); //? auto create test collection

mongoose.connection.on("error", (err) =>
  log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => log("mongo disconnected"));
mongoose.connection.once("open", () => {
  log("connected to mongoose...");
});

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "Holidays" });
});

app.listen(PORT, () => {
  console.log(`express started on ${PORT}`);
});
