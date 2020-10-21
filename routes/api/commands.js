const express = require("express");
const puppeteer = require("puppeteer");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.get("/test", (req, res) => res.sendFile("C://work/data_entry/abesell2.png"));

router.post("/do", async (req, res) => {
  let commands = req.body.data;
  const sessionID = uuidv4();
  const write_path = "sessions/" + sessionID + "/";
  if (!fs.existsSync(write_path)) {
    fs.mkdirSync(write_path);
  }
  let response = {
    session: sessionID,
    variables: [],
    errors: [],
  };
  req.setTimeout(0);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await init_page(page);
  while (commands.length > 0) {
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
        let url = await screenshot(page, commands[0], write_path);
        await response.variables.push(url);
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
    }
  }
  await browser.close();
  await res.json(response);
});

module.exports = router;

const init_page = async (page) => {
  page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  return page;
};

const load_url = async (page, command) => {
  await page.goto(command.url, { waitUntil: "networkidle2" });
  //   await page.waitForNavigation();
};
const screenshot = async (page, command, write_path) => {
  await page.screenshot({ path: write_path + command.file_name });
  return command.path;
};

const type = async (page, command) => {
  await page.type(command.selector, command.value, { delay: 50 });
};

const submit_form = async (page, command) => {
  const form = await page.$(command.selector);
  await form.evaluate((form) => form.submit());
  await page.waitForNavigation({ waitUntil: "load" });
};

const click = async (page, command) => {
  await page.click(command.selector);
};

const set_timeout = async (page, command) => {
  await page.waitFor(command.duration);
};
