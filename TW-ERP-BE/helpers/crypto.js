var CryptoJS = require("crypto-js");

exports.encrypt = (ciphertext, KEY) => {
  return CryptoJS.AES.encrypt(ciphertext, KEY).toString();
};

exports.decrypt = (ciphertext, KEY) => {
  var bytes = CryptoJS.AES.decrypt(ciphertext, KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
