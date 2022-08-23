const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
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

if (process.argv[2] !== "dev") {
  console.log("Launching in Production Mode");
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
} else {
  console.log("Lanching in Development Mode");
}

// Route API Requests
app.use("/api/scripts", scripts);
app.use("/api/users", users);

app.listen(5500, () => console.log(`Server running on port ${5000}`));
