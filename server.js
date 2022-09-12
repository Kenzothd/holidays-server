require("dotenv").config();
const express = require("express");
const log = require("debug")("holidays:server");

//config
const app = express();
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/test";
const PORT = process.env.PORT ?? 3300;
mongoose.connect(MONGO_URI, {}, () => {
  console.log("the connection with mongodb is established");
}); //? auto create test collection

//middleware
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "Holidays" });
});

app.listen(PORT, () => {
  console.log(`express started on ${PORT}`);
});
