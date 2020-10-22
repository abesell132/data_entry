const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load User model
const Script = require("../../models/Script");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
  const newScript = new Script({
    id: uuidv4(),
    name: req.body.name,
    owner: req.user.id,
    commands: [],
  });
  newScript
    .save()
    .then((res) => res.send({}))
    .catch((err) => res.send(err));
});
router.post("/updateCommands", passport.authenticate("jwt", { session: false }), (req, res) => {
  console.log(req.body.id);
  console.log(req.body.commands);
  Script.findOneAndUpdate({ owner: req.user.id, id: req.body.id }, { commands: req.body.commands }, { useFindAndModify: false })
    .then((script) => {
      res.send(script);
    })
    .catch((err) => res.send(err));
});

router.post("/queryScripts", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.find({ owner: req.user.id })
    .then((scripts) => res.send(scripts))
    .catch((err) => res.send(err));
});

router.post("/findOne", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOne({ owner: req.user.id, id: req.body.id })
    .then((script) => res.send(script))
    .catch((err) => res.send(err));
});

module.exports = router;
