const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");

// Load express router files
const users = require("./routes/api/users");
const scripts = require("./routes/api/scripts");

const app = express();

app.use(passport.initialize());
require("./config/passport")(passport);

// Connect To Database
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    if (err) throw err;
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route API Requests
app.use("/api/scripts", scripts);
app.use("/api/users", users);

app.listen(5000, () => console.log(`Server running on port ${5000}`));
