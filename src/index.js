const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const JobResource = require("./Job/JobResource");

console.log("inside index \n");

require("dotenv").config();

const port = process.env.PORT || 3000;

mongoose.set("useCreateIndex", true);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, () => console.log("connect to DB!"));

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/jobs", JobResource);

app.listen(port, () => console.log(`listening on port ${port}`));
