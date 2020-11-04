const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
var formidable = require("formidable");
const fs = require("fs");
const passport = require("passport");
const commands = require("./commands");
const _ = require("lodash");

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
      if (err) throw err;
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
    .then((script) => {
      fs.rmdir(path.join(__dirname, "../../scripts/" + req.body.id), { recursive: true }, (err) => {
        if (err) throw err;
        res.send("Success");
      });
    })
    .catch((err) => res.send(err));
});

router.post("/executeScript", passport.authenticate("jwt", { session: false }), async (req, res) => {
  req.setTimeout(0);
  Script.findOne({ owner: req.user.id, id: req.body.id })
    .then((script) => {
      let scriptCommands = script.commands;
      commands.executeCommands(scriptCommands, req.body.id, script).then((response) => res.send(response));
    })
    .catch((err) => res.send(err));
});

router.post("/createVariable", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOneAndUpdate({ id: req.body.scriptID }, { $push: { variables: req.body.variable } }, { new: true, useFindAndModify: false })
    .then((script) => {
      res.send(script.variables);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/updateVariable", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOneAndUpdate({ id: req.body.scriptID, "variables.id": req.body.variable.id }, { $set: { "variables.$": req.body.variable } }, { new: true, useFindAndModify: false })
    .then((script) => {
      res.send(script.variables);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get Variable File
router.get("/variable/:scriptID/:type/:variableID", (req, res) => {
  Script.findOne({ id: req.params.scriptID })
    .then((script) => {
      if (req.params.type == "generated") {
        res.sendFile(path.join(__dirname, "../../", "/scripts/" + req.params.scriptID + "/" + req.params.type + "/" + req.params.variableID));
      } else {
        let variable = _.find(script.variables, { id: req.params.variableID });
        console.log(variable);
        res.sendFile(path.join(__dirname, "../../", "/scripts/" + req.params.scriptID + "/" + req.params.type + "/" + req.params.variableID + "." + getFileExtension(variable.name)));
      }
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
      form.parse(req, (err, fields, file) => {
        if (err) {
          next(err);
          return;
        }
        let id = uuidv4();
        let newVariable = {
          id: id,
          name: file.file.name,
          imageType: "uploaded",
          type: "image",
        };

        Script.findOneAndUpdate({ id: req.params.scriptID }, { $push: { variables: newVariable } }, { new: true, useFindAndModify: false })
          .then((script) => {
            res.send(script.variables);
          })
          .catch((err) => {
            console.log(err);
          });

        rename_file(file, write_path, id);
      });
    })
    .catch((err) => {
      if (err) throw err;
    });
});

router.post("/deleteVariable", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOneAndUpdate({ owner: req.user.id, id: req.body.scriptID }, { $pull: { variables: { id: req.body.variable.id } } }, { new: true, useFindAndModify: false })
    .then((script) => {
      console.log(script);
      if (req.body.variable.type && req.body.variable.type == "image") {
        if (req.body.variable.generated) {
          fs.unlinkSync(path.join(__dirname, "../../scripts/" + req.body.scriptID + "/generated/" + req.body.variable.name), (err) => {
            if (err) throw err;
          });
        } else {
          fs.unlinkSync(path.join(__dirname, "../../scripts/" + req.body.scriptID + "/uploaded/" + req.body.variable.id + "." + getFileExtension(req.body.variable.name)), (err) => {
            if (err) throw err;
          });
        }
      }
      res.send(script.variables);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

router.post("/variableDelete/:scriptID/:file_name", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOne({ owner: req.user.id, id: req.body.scriptID })
    .then((script) => {
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

function rename_file(uploaded_file, write_path, id) {
  let fileExtension = getFileExtension(uploaded_file.file.name);

  fs.rename(uploaded_file.file.path, write_path + id + "." + fileExtension, (err) => {
    if (err) throw err;
  });
}

const getFileExtension = (filename) => {
  return filename.substring(filename.lastIndexOf(".") + 1, filename.length) || filename;
};

module.exports = router;
