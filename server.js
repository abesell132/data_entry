const puppeteer = require("puppeteer");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");

const commandsAPI = require("./routes/api/commands");
const users = require("./routes/api/users");
const scripts = require("./routes/api/scripts");

const app = express();
const db = require("./config/keys").mongoURI;
app.use(passport.initialize());
require("./config/passport")(passport);
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/commands", commandsAPI);
app.use("/api/scripts", scripts);
app.use("/api/users", users);
app.listen(5000, () => console.log(`Server running on port ${5000}`));
