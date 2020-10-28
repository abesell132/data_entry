const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
var formidable = require("formidable");
const fs = require("fs");
const passport = require("passport");
const commands = require("./commands");

// Load User model
const Script = require("../../models/Script");

router.post("/addScript", passport.authenticate("jwt", { session: false }), (req, res) => {
  const newScript = new Script({
    id: uuidv4(),
    name: req.body.name,
    owner: req.user.id,
    commands: [],
  });
  const write_path = "scripts/" + newScript.id + "/";
  if (!fs.existsSync(write_path)) {
    fs.mkdirSync(write_path);
    fs.mkdirSync(write_path + "uploaded");
    fs.mkdirSync(write_path + "generated");
  }
  newScript
    .save()
    .then((script) => {
      delete script.owner;
      delete script._id;
      res.send(script);
    })
    .catch((err) => res.send(err));
});

router.post("/updateScript", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOneAndUpdate({ owner: req.user.id, id: req.body.id }, req.body.script, { useFindAndModify: false })
    .then((script) => {
      res.send(script);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/getAccountScripts", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.find({ owner: req.user.id })
    .then((scripts) => {
      let returnArray = [];
      for (let a = 0; a < scripts.length; a++) {
        returnArray.push({
          commands: scripts[a].commands,
          id: scripts[a].id,
          name: scripts[a].name,
        });
      }
      res.send(returnArray);
    })
    .catch((err) => res.send(err));
});

router.post("/getScript", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOne({ owner: req.user.id, id: req.body.id })
    .then((script) => res.send(script))
    .catch((err) => res.send(err));
});

router.post("/deleteScript", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOneAndDelete({ owner: req.user.id, id: req.body.id })
    .then((script) => res.send(script))
    .catch((err) => res.send(err));
});

router.post("/executeScript", passport.authenticate("jwt", { session: false }), async (req, res) => {
  req.setTimeout(0);
  Script.findOne({ owner: req.user.id, id: req.body.id })
    .then((script) => {
      let scriptCommands = script.commands;
      commands.executeCommands(scriptCommands, req.body.id).then((response) => res.send(response));
    })
    .catch((err) => res.send(err));
});

// Get Variable File
router.get("/variable/:scriptID/:type/:file_name", (req, res) => {
  Script.findOne({ id: req.params.scriptID })
    .then(() => {
      res.sendFile(path.join(__dirname, "../../", "/scripts/" + req.params.scriptID + "/" + req.params.type + "/" + req.params.file_name));
    })
    .catch((err) => {
      if (err) throw err;
    });
});

// Upload Variable File
router.post("/variable/:scriptID/:file_name", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  const write_path = path.join(__dirname, "../../", "/scripts/" + req.params.scriptID + "/uploaded/");
  Script.findOne({ owner: req.user.id, id: req.params.scriptID })
    .then(() => {
      const form = formidable({ multiples: false, uploadDir: write_path, keepExtensions: true });
      form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        rename_files(files, write_path);
      });
      res.send("Success");
    })
    .catch((err) => {
      if (err) throw err;
    });
});

router.post("/variableDelete/:scriptID/:file_name", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOne({ owner: req.user.id, id: req.params.scriptID })
    .then(() => {
      if (req.body.generated) {
        fs.unlinkSync(path.join(__dirname, "../../scripts/" + req.params.scriptID + "/generated/" + req.params.file_name), (err) => {
          if (err) throw err;
        });
      } else {
        fs.unlinkSync(path.join(__dirname, "../../scripts/" + req.params.scriptID + "/uploaded/" + req.params.file_name), (err) => {
          if (err) throw err;
        });
      }
      res.send("Removed");
    })
    .catch((err) => {
      if (err) throw err;
    });
});

module.exports = router;

function rename_files(uploaded_file, write_path) {
  fs.rename(uploaded_file.file.path, write_path + uploaded_file.file.name, (err) => {
    if (err) throw err;
  });
}
