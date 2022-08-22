const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const utils = require("../../utils");
const variables = require("./variables");
const commandsAPI = require("./commandAPI");
const _ = require("lodash");

// @desc    Removes all generated files from script file structure. Important for subsequent script executions for scripts
//          that generate variables.
// @params  scriptID {String} - ScriptID
const unlinkGeneratedVariables = (write_path) => {
  const directory = write_path + "generated";
  if (fs.existsSync(directory))
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    });
};

// @desc      Checks if image exists in response.variables array
// @params    varList {Array}
const imageExists = (varList, command) => {
  if (
    _.findIndex(varList, {
      type: "image",
      name: command.name,
      generated: true,
      imageType: utils.getFileExtension(command.name),
    }) == -1
  ) {
    return false;
  }
  return true;
};

// @desc    Initializes Virtual Page Any Configuration before script execution should be done here
// @params    Page {Object} - Puppeteer Page Variable
const init_page = async (page) => {
  page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  return page;
};

// @desc    Executes Array of Commands, command array may be manipulated by command results and conditions
// @params  commands {Array} - Array of commands to be executed
//          id {String} - Script ID
const executeCommands = async (commands, id, script) => {
  // Launch Browser
  const browser = await puppeteer.launch();
  // Create New Page
  const page = await browser.newPage();
  await init_page(page);

  const write_path = "scripts/" + id + "/";
  unlinkGeneratedVariables(write_path);

  // Init Response
  let response = { id, variables: [], errors: [] };

  while (commands.length > 0) {
    variables.parseVariables(commands[0]);
    switch (commands[0].type) {
      case "CLICK":
        await commandsAPI.click(page, commands[0]);
        await commands.shift();
        continue;

      case "LOAD_URL":
        await commandsAPI.load_url(page, commands[0]);
        await commands.shift();
        continue;

      case "SCREENSHOT":
        await commandsAPI.screenshot(page, commands[0], write_path);
        if (!imageExists(response.variables, commands[0])) {
          await response.variables.push({
            type: "image",
            name: commands[0].name,
            generated: true,
            imageType: utils.getFileExtension(commands[0].name),
            id: uuidv4(),
          });
        }
        await commands.shift();
        continue;

      case "SET_TIMEOUT":
        await commandsAPI.set_timeout(page, commands[0]);
        await commands.shift();
        continue;

      case "SUBMIT_FORM":
        await commandsAPI.submit_form(page, commands[0]);
        await commands.shift();
        continue;

      case "TYPE":
        await commandsAPI.type(page, commands[0]);
        await commands.shift();
        continue;

      case "ARRAY_LOOP":
        let pushCommands = await commandsAPI.array_loop(commands[0]);
        await commands.shift();
        // Add New Commands To the beginning of the commands to be executed list. The commands have not been executed, they have only been staged for execution.
        commands = pushCommands.concat(commands);
        continue;
    }
  }
  await browser.close();
  return response;
};

exports.executeCommands = executeCommands;
