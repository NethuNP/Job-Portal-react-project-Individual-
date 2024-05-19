const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;



mongoose.connect(URL, {
  dbname:"Jobnest",
 // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
 // useFindAndModify: false
});

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "MongoDB connection error:"));
connection.once("open", () => {
  console.log("MongoDB connection successful!");
});


const jobRouter = require ("./routes/jobs.js");
const registerRouter = require ("./routes/registers.js");
const approvedJobRouter = require("./routes/ApprovedJobs.js");
const applicationRouter =require ("./routes/Applications.js");


app.use("/jobs",jobRouter);
app.use ("/registers" , registerRouter)
app.use("/approvedjobs", approvedJobRouter)
app.use(cors());
app.use(express.json());
app.use('/applications', applicationRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
