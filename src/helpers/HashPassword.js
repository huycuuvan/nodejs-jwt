var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  var hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
};
const comparePassword = (inputPass, hashedPass) => {
  var comparePass = bcrypt.compareSync(inputPass, hashedPass);
  return comparePass;
};
module.exports = {
  hashPassword: hashPassword,
  comparePassword: comparePassword,
};
