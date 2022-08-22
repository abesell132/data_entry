const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
var formidable = require("formidable");
const utils = require("../../utils");
const fs = require("fs");
const passport = require("passport");
const executor = require("./executor");
const _ = require("lodash");

// Load User model
const Script = require("../../models/Script");

// @route   POST api/scripts/addScript
// @desc    Adds New Script to Database and Creates Folders in FS for writing.
// @access  Private
// @body    name {String} - Script name.
router.post("/addScript", passport.authenticate("jwt", { session: false }), (req, res) => {
  const newScript = new Script({
    id: uuidv4(),
    name: req.body.name,
    owner: req.user.id,
    commands: [],
  });

  // Create Script Write FS Structure
  const write_path = "scripts/" + newScript.id + "/";
  if (!fs.existsSync(write_path)) {
    fs.mkdirSync(write_path);
    fs.mkdirSync(write_path + "uploaded");
    fs.mkdirSync(write_path + "generated");
  }

  newScript
    .save()
    .then((script) => {
      // Remove Added/Database Information
      delete script.owner;
      delete script._id;

      res.send(script);
    })
    .catch((err) => res.send(err));
});

// @route   POST api/scripts/updateScript
// @desc    Updates script values in database with values provided in request body
// @access  Private
// @body    script {Object} - Object of key/value pairs to update
//          id {String} - ID of the Script to Update
router.post("/updateScript", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOneAndUpdate({ owner: req.user.id, id: req.body.id }, req.body.script, { useFindAndModify: false })
    .then((script) => {
      res.send(script);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

// @route   POST api/scripts/getAccountScripts
// @desc    Returns an [Array] of all scripts connected to an account
// @access  Private
router.post("/getAccountScripts", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.find({ owner: req.user.id })
    .then((scripts) => {
      let returnArray = [];

      // Loop through found scripts, push new object of script data to array to be sent to user.
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

// @route   POST api/scripts/getScript
// @desc    Returns a script
// @access  Private
// @body    id - ID of the scrip to be returned.
router.post("/getScript", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOne({ owner: req.user.id, id: req.body.id })
    .then((script) => res.send(script))
    .catch((err) => res.send(err));
});

// @route   POST api/scripts/deleteScript
// @desc    Deletes a script and removes Script Write Path
// @access  Private
// @body    id - ID of the scrip to be deleted.
router.post("/deleteScript", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOneAndDelete({ owner: req.user.id, id: req.body.id })
    .then(() => {
      // Remove Script file path
      fs.rmdir(path.join(__dirname, "../../scripts/" + req.body.id), { recursive: true }, (err) => {
        if (err) throw err;
        res.send("Success");
      });
    })
    .catch((err) => res.send(err));
});

// @route   POST api/scripts/executeScript
// @desc    Loads Script from Database, and sends to command executor, sends execution reuslts to user.
// @access  Private
// @body    id - ID of the scrip to be executed.
router.post("/executeScript", passport.authenticate("jwt", { session: false }), async (req, res) => {
  // This might take a while.
  req.setTimeout(0);

  Script.findOne({ owner: req.user.id, id: req.body.id })
    .then((script) => {
      executor.executeCommands(script.commands, req.body.id, script).then((response) => res.send(response));
    })
    .catch((err) => res.send(err));
});

// @route   POST api/scripts/createVariable
// @desc    Pushes new variable to script.variables array.
// @access  Private
// @body    scriptID {String} - ID of the script to be executed.
//          variable {Object} - New Variable
//              @requires - id {String}, name {String}, value {Mixed}, type {String}
router.post("/createVariable", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOneAndUpdate(
    { id: req.body.scriptID },
    { $push: { variables: req.body.variable } },
    { new: true, useFindAndModify: false }
  )
    .then((script) => {
      res.send(script.variables);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

// @route   POST api/scripts/updateVariable
// @desc    Sets variable value in script.variables array.
// @access  Private
// @body    scriptID {String} - ID of the script to be executed.
//          variable {Object} - New Variable
//              @requires - id {String}, name {String}, value {Mixed}, type {String}
router.post("/updateVariable", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOneAndUpdate(
    { id: req.body.scriptID, "variables.id": req.body.variable.id },
    { $set: { "variables.$": req.body.variable } },
    { new: true, useFindAndModify: false }
  )
    .then((script) => {
      res.send(script.variables);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

// @route   GET api/scripts/variable/:scriptID/:type/:variableID
// @desc    Sends image
// @access  Public
// @params  scriptID {String} - ID of the script containing the file.
//          type {String} - Generated or Uploaded
//          variableID {String} - ID or name of file to be retrieved.
router.get("/variable/:scriptID/:type/:variableID", (req, res) => {
  Script.findOne({ id: req.params.scriptID })
    .then((script) => {
      if (req.params.type == "generated") {
        res.sendFile(
          path.join(
            __dirname,
            "../../",
            "/scripts/" + req.params.scriptID + "/" + req.params.type + "/" + req.params.variableID
          )
        );
      } else {
        let variable = _.find(script.variables, { id: req.params.variableID });
        res.sendFile(
          path.join(
            __dirname,
            "../../",
            "/scripts/" +
              req.params.scriptID +
              "/" +
              req.params.type +
              "/" +
              req.params.variableID +
              "." +
              getFileExtension(variable.name)
          )
        );
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
});

// @route   POST api/scripts/variable/:scriptID/imageUpload
// @desc    Upload image, create and save new variable, then rename uploaded file.
// @access  Private
// @params  scriptID {String} - ID of the script to upload file to.
// @body    NOTE: See formiddable documentation
router.post("/variable/:scriptID/imageUpload", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  const write_path = path.join(__dirname, "../../", "/scripts/" + req.params.scriptID + "/uploaded/");

  Script.findOne({ owner: req.user.id, id: req.params.scriptID })
    .then(() => {
      // Handle Image Upload
      const form = formidable({
        multiples: false,
        uploadDir: write_path,
        keepExtensions: true,
      });
      form.parse(req, (err, fields, file) => {
        if (err) {
          next(err);
          return;
        }

        // Init new Variable
        let id = uuidv4();
        let newVariable = {
          id: id,
          name: file.file.name,
          generated: false,
          imageType: utils.getFileExtension(file.file.name),
          type: "image",
        };

        // Add Variable To Scipt
        Script.findOneAndUpdate(
          { id: req.params.scriptID },
          { $push: { variables: newVariable } },
          { new: true, useFindAndModify: false }
        )
          .then((script) => {
            res.send(script.variables);
          })
          .catch((err) => {
            if (err) throw err;
          });

        rename_file(file, write_path, id);
      });
    })
    .catch((err) => {
      if (err) throw err;
    });
});

// @route   POST api/scripts/deleteVariable
// @desc    Deletes Image and Remove Variable File if exists, and sends new variable list.
// @access  Private
// @body    scriptID {String} - ID of the script to delete variable from.
//          variable {Object} - Variable Object to delete
router.post("/deleteVariable", passport.authenticate("jwt", { session: false }), (req, res) => {
  Script.findOneAndUpdate(
    { owner: req.user.id, id: req.body.scriptID },
    { $pull: { variables: { id: req.body.variable.id } } },
    { new: true, useFindAndModify: false }
  )
    .then((script) => {
      // NOTE: if in the future there are different variable types that are being saved, they need to be added here
      if (req.body.variable.type && req.body.variable.type == "image") {
        let variablePath;

        // Determine Write Path (Generated vs Uploaded)
        if (req.body.variable.generated) {
          variablePath = path.join(
            __dirname,
            "../../scripts/" + req.body.scriptID + "/generated/" + req.body.variable.name
          );
        } else {
          variablePath = path.join(
            __dirname,
            "../../scripts/" +
              req.body.scriptID +
              "/uploaded/" +
              req.body.variable.id +
              "." +
              getFileExtension(req.body.variable.name)
          );
        }
        // Unlink Variable
        fs.unlinkSync(variablePath, (err) => {
          if (err) throw err;
        });
      }
      res.send(script.variables);
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
