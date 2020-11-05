import { v4 as uuidv4 } from "uuid";

const getElementConfig = (command) => {
  let uuid = command.id ? command.id : uuidv4();
  switch (command.type) {
    case "CLICK":
      return {
        actionBlockProps: {
          name: "Click",
          fields: [
            {
              label: "Selector",
              inputType: "text",
              slug: "selector",
              accepts: ["string", "number"],
              value: command.selector,
            },
          ],
          id: command.id,
        },
        addCommandPayload: {
          type: command.type,
          selector: command.selector,
          id: uuid,
        },
      };
    case "LOAD_URL":
      return {
        actionBlockProps: {
          name: "Load URL",
          fields: [
            {
              label: "Address",
              inputType: "text",
              accepts: ["string", "number"],
              slug: "url",
              value: command.url,
            },
          ],
          id: command.id,
        },
        addCommandPayload: {
          type: command.type,
          url: command.url,
          id: uuid,
        },
      };
    case "SCREENSHOT":
      return {
        actionBlockProps: {
          name: "Screenshot",
          fields: [
            {
              label: "File Name",
              accepts: ["string", "number"],
              inputType: "text",
              slug: "name",
              value: command.name,
            },
          ],
          id: command.id,
        },
        addCommandPayload: {
          type: command.type,
          name: command.name,
          id: uuid,
        },
      };
    case "SET_TIMEOUT":
      return {
        actionBlockProps: {
          name: "Set Timeout",
          fields: [
            {
              label: "Duration (ms)",
              inputType: "text",
              accepts: ["number"],
              slug: "duration",
              value: command.duration,
            },
          ],
          id: command.id,
        },
        addCommandPayload: {
          type: command.type,
          duration: command.duration,
          id: uuid,
        },
      };
    case "SUBMIT_FORM":
      return {
        actionBlockProps: {
          name: "Submit Form",
          fields: [
            {
              label: "Selector",
              inputType: "text",
              accepts: ["string", "number"],
              slug: "selector",
              value: command.selector,
            },
          ],
          id: command.id,
        },
        addCommandPayload: {
          type: command.type,
          selector: command.selector,
          id: uuid,
        },
      };
    case "TYPE":
      return {
        actionBlockProps: {
          name: "Type",
          fields: [
            {
              label: "Selector",
              inputType: "text",
              slug: "selector",
              accepts: ["string", "number"],
              value: command.selector,
            },
            {
              label: "Text",
              inputType: "text",
              slug: "text",
              accepts: ["string", "number"],
              value: command.text,
            },
          ],
          id: command.id,
        },
        addCommandPayload: {
          type: command.type,
          selector: command.selector,
          text: command.text,
          id: uuid,
        },
      };
    case "ARRAY_LOOP":
      return {
        actionBlockProps: {
          name: "Array Loop",
          array: command.array,
          commands: command.commands,
          fields: [
            {
              label: "Array",
              inputType: "text",
              slug: "array",
              accepts: ["string", "number", "array"],
              value: command.array,
            },
          ],
          id: command.id,
        },
        addCommandPayload: {
          type: command.type,
          array: command.array,
          commands: command.commands,
          id: uuid,
        },
      };
    default:
      break;
  }
};

export default getElementConfig;
