const groupService = require("../services/groupService");
const handleGetAllGroup = async (req, res) => {
  try {
    let data = await groupService.getAllGroup();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "server died",
      EC: -1,
    });
  }
};

module.exports = {
  handleGetAllGroup: handleGetAllGroup,
};
