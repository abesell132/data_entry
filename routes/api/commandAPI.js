const commandAPI = {
  // @desc      Loads url to page
  // @params    Page {Object} - Puppeteer Page
  //            command {Object} - command data
  //                @requires   type {String}, url {String::url}
  load_url: async (page, command) => {
    await page.goto(command.url, {
      waitUntil: "networkidle2",
    });
  },

  // @desc      Clicks an element on the page
  // @params    Page {Object} - Puppeteer Page
  //            command {Object} - command data
  //                @requires   type {String}, selector {String::DOM_Selector}
  click: async (page, command) => {
    await page.click(command.selector);
  },

  // @desc      Screenshots current virtual view of the page
  // @params    Page {Object} - Puppeteer Page
  //            command {Object} - command data
  //                @requires   type {String}, name {String::FilePath}
  screenshot: async (page, command, write_path) => {
    await page.screenshot({
      path: write_path + "generated/" + command.name,
    });
  },

  // @desc      Pauses execution of script for (n)th milliseconds
  // @params    Page {Object} - Puppeteer Page
  //            command {Object} - command data
  //                @requires   type {String}, duration {Number} - Time in MS
  set_timeout: async (page, command) => {
    await page.waitForTimeout(parseInt(command.duration));
  },

  // @desc      Submits Form on Page, Wait until network is idle
  // @params    Page {Object} - Puppeteer Page
  //            command {Object} - command data
  //                @requires   type {String}, selector {String::DOM_Selector} - Form Selector
  submit_form: async (page, command) => {
    const form = await page.$(command.selector);
    await form.evaluate((form) => form.submit());
    await page.waitForNavigation({
      waitUntil: "networkidle2",
    });
  },

  // @desc      Types text into a page selector (input, textarea, etc.)
  // @params    Page {Object} - Puppeteer Page
  //            command {Object} - command data
  //                @requires   type {String}, selector {String::DOM_Selector} - Form Selector, text {String} - text to type
  type: async (page, command) => {
    await page.type(command.selector, command.text, { delay: 50 });
  },

  // @desc      loops through list and generates new array of commands, adds current list value and index for variable parsing
  // @params    valuesObj {Object} - Puppeteer Page
  //                @requires   array {Array} - Array of Values to Loop Through, commands {Array} - Array of Commands to generate with array values
  array_loop: (valuesObj) => {
    let newCommands = [];

    // Loop through Array
    for (let a = 0; a < valuesObj.array.length; a++) {
      let currentListValue = valuesObj.array[a];

      // For each array value, loop through the commands list
      for (let b = 0; b < valuesObj.commands.length; b++) {
        //   Create new Command, Add value and index, push to new command list
        let newCommand = { ...valuesObj.commands[b] };
        newCommand.arrVal = currentListValue;
        newCommand.arrIndex = a;
        newCommands.push(newCommand);
      }
    }

    return newCommands;
  },
};

module.exports = commandAPI;
