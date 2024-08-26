const db = require("../models/index");
const getAllGroup = async () => {
  try {
    let group = await db.Group.findAll({
      order: [["name", "ASC"]],
    });
    if (group) {
      return {
        EC: "0",
        EM: "ok",
        DT: group,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EC: "1",
      EM: "Cannot Found",
      DT: "",
    };
  }
};
module.exports = {
  getAllGroup: getAllGroup,
};
