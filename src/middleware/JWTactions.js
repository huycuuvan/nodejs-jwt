var jwt = require("jsonwebtoken");
require("dotenv").config();
const createJWT = () => {
  let payload = { name: "dhuy", age: "20" };
  let key = process.env.JWT_TOKEN;
  let token = null;
  try {
    token = jwt.sign(payload, key);
    console.log(token);
  } catch (error) {
    console.log(error);
  }

  return token;
};

module.exports = {
  createJWT: createJWT,
};
