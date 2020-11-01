const getDefaultBlockProps = (command) => {
  switch (command.type) {
    case "CLICK":
      return {
        name: "Click",
        fields: [{ label: "Selector", inputType: "text", slug: "selector", value: command.selector }],
        id: command.id,
      };
    case "LOAD_URL":
      return {
        name: "Load URL",
        fields: [{ label: "Address", inputType: "text", slug: "url", value: command.url }],
        id: command.id,
      };
    case "SCREENSHOT":
      return {
        name: "Screenshot",
        fields: [{ label: "File Name", inputType: "text", slug: "name", value: command.name }],
        id: command.id,
      };
    case "SET_TIMEOUT":
      return {
        name: "Set Timeout",
        fields: [{ label: "Duration (ms)", inputType: "text", slug: "duration", value: command.duration }],
        id: command.id,
      };
    case "SUBMIT_FORM":
      return {
        name: "Submit Form",
        fields: [{ label: "Selector", inputType: "text", slug: "selector", value: command.selector }],
        id: command.id,
      };
    case "TYPE":
      return {
        name: "Type",
        fields: [
          { label: "Selector", inputType: "text", slug: "selector", value: command.selector },
          { label: "Text", inputType: "text", slug: "text", value: command.text },
        ],
        id: command.id,
      };
    default:
      break;
  }
};

module.exports = getDefaultBlockProps;
