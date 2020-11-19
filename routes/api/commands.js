const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const utils = require("../../utils");
const variables = require("./variables");
const _ = require("lodash");

const executeCommands = async (commandsList, id, script) => {
  let commands = commandsList;
  const write_path = "scripts/" + id + "/";
  const directory = write_path + "generated";
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });

  let response = {
    id: id,
    variables: [],
    errors: [],
  };
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await init_page(page);
  while (commands.length > 0) {
    console.log(commands);
    setTimeout(function () {}, 20000);
    variables.parseVariables(commands[0]);
    switch (commands[0].type) {
      case "CLICK":
        await click(page, commands[0]);
        await commands.shift();
        continue;
      case "LOAD_URL":
        await load_url(page, commands[0]);
        await commands.shift();
        continue;
      case "SCREENSHOT":
        await screenshot(page, commands[0], write_path);
        if (
          _.findIndex(response.variables, {
            type: "image",
            name: commands[0].name,
            generated: true,
            imageType: utils.getFileExtension(commands[0].name),
          }) == -1
        ) {
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
        await set_timeout(page, commands[0]);
        await commands.shift();
        continue;
      case "SUBMIT_FORM":
        await submit_form(page, commands[0]);
        await commands.shift();
        continue;
      case "TYPE":
        await type(page, commands[0]);
        await commands.shift();
        continue;
      case "ARRAY_LOOP":
        let pushCommands = await array_loop(commands[0]);
        await commands.shift();
        commands = pushCommands.concat(commands);
        continue;
    }
  }
  await browser.close();
  return response;
};

exports.executeCommands = executeCommands;

const init_page = async (page) => {
  page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  return page;
};

const array_loop = (valuesObj) => {
  let modifiedCommands = [];

  for (let a = 0; a < valuesObj.array.length; a++) {
    let currentListValue = valuesObj.array[a];

    for (let b = 0; b < valuesObj.commands.length; b++) {
      let newCommand = { ...valuesObj.commands[b] };
      newCommand.arrVal = currentListValue;
      newCommand.arrIndex = a;
      modifiedCommands.push(newCommand); // NOTE: pushes incorrectly
    }
  }

  return modifiedCommands;
};

const load_url = async (page, command) => {
  await page.goto(command.url, {
    waitUntil: "networkidle2",
  });
  await page.waitFor(1000);
};
const screenshot = async (page, command, write_path) => {
  await page.screenshot({
    path: write_path + "generated/" + command.name,
  });
  return command.path;
};

const type = async (page, command) => {
  await page.type(command.selector, command.text, { delay: 50 });
};

const submit_form = async (page, command) => {
  const form = await page.$(command.selector);
  await form.evaluate((form) => form.submit());
  await page.waitForNavigation({
    waitUntil: "load",
  });
};

const click = async (page, command) => {
  await page.click(command.selector);
};

const set_timeout = async (page, command) => {
  await page.waitFor(parseInt(command.duration));
};
