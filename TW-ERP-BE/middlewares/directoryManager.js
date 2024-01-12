const FS = require("../helpers/utils/");

exports.checkAndMakeDirectory = (folderPath) => async (req, res, next) => {
  try {
    await FS.makeDirectory(folderPath);
    return next();
  } catch (error) {
    throw new Error(error);
  }
};
