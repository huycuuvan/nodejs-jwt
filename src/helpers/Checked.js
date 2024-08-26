const db = require("../models");

const checkEmailExist = async (email) => {
  let user = await db.User.findOne({ where: { email: email } });

  if (user) {
    return true;
  }
  return false;
};
const checkPhoneExist = async (phone) => {
  let user = await db.User.findOne({ where: { phone: phone } });

  if (user) {
    return true;
  }
  return false;
};

module.exports = {
  checkEmailExist: checkEmailExist,
  checkPhoneExist: checkPhoneExist,
};
