// index.js

const config = require("config");
const mongoose = require("mongoose");
const usersRoute = require("./routes/user.route");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config();
connectDB();

const app = express();


//use config module to get the privatekey, if no private key set, end the application
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

app.use(express.json());
//use users route for api/users
app.use("/api/v1/users", usersRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
