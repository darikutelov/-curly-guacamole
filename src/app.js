const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const api = require("./routes/api");

const app = express();

app.use(morgan("combined"));
app.use(cors());

app.use(express.json());
app.use("/api/v1", api);

module.exports = app;
