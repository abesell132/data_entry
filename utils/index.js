const utils = {
  getFileExtension: (filename) => {
    return filename.substring(filename.lastIndexOf(".") + 1, filename.length) || filename;
  },
};

module.exports = utils;
