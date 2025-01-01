const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const consignorRoutes = require("./route/consignorRoutes");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const consigneeRoutes = require("./route/consigneeRoutes");
const vehicleRoutes = require("./route/vehicleRoutes");
const brokerRoutes = require("./route/brokerRoutes");
const reportRoutes = require("./route/reportRoutes");
const locationRoutes = require("./route/locationRoutes");
const memoentryroutes = require("./route/memoRoutes");
const memodetails = require("./route/memoDetailRoute");
const userRoutes = require("./route/userRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.json());
require("dotenv").config();

app.use(
  cors({
    origin: process.env.ORGIN,
	  credentials: true,
  })
);
app.use("/api/memo", memoentryroutes);
app.use("/api/user", userRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/broker", brokerRoutes);
app.use("/api/consignor", consignorRoutes);
app.use("/api/consignee", consigneeRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/memodetails", memodetails);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("server listening", process.env.MONGO_URI);
    });
  })
  .catch((err) => {
    console.log(err);
  });
