const userService = require("../services/userService");
const handleGetAllUser = async (req, res) => {
  // console.log(userId);
  // const data = await userService.getAllUser(userId || "ALL");
  // return res.status(200).json({
  //   EC: data.EC,
  //   EM: data.EM,
  //   DT: data.DT,
  // });

  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      let data = await userService.getUserWithPanigation(+page, +limit);
      return res.status(200).json({
        EC: data.EC,
        EM: data.EM,
        DT: data.DT,
      });
    } else {
      const userId = req.query.id;

      let data = await userService.getAllUser(userId || "ALL");
      return res.status(200).json({
        EC: data.EC,
        EM: data.EM,
        DT: data.DT,
      });
    }
  } catch (error) {
    return res.status(500).json({
      EM: "server died",
      EC: -1,
    });
  }
};

const handleRegister = async (req, res) => {
  const inforUser = await userService.createNewUser(req.body);
  if (!req.body.email || !req.body.password || !req.body.phone) {
    return res.status(200).json({
      EC: "1",
      EM: "Missing required parameters",
    });
  }
  return res.status(200).json({
    EC: inforUser.EC,
    EM: inforUser.EM,
    inforUser,
  });
};
const handleLogin = async (req, res) => {
  let data = await userService.userLogin(req.body);
  console.log(data);
  return res.status(200).json({
    EM: data.EM,
    EC: data.EC,
    DT: data.DT,
  });
};

const handleCreateNewUser = async (req, res) => {
  try {
    let data = await userService.createUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "server died",
      EC: -1,
    });
  }
};
const handleUpdateUser = async (req, res) => {};
const handleDeleteUser = async (req, res) => {
  let data = await userService.deleteUser(req.query.id);
  console.log("req.query.id", req.query.id);
  return res.status(200).json({
    EM: data.EM,
    EC: data.EC,
    DT: data.DT,
  });
};
module.exports = {
  handleGetAllUser: handleGetAllUser,
  handleRegister: handleRegister,
  handleLogin: handleLogin,
  handleCreateNewUser: handleCreateNewUser,
  handleUpdateUser: handleUpdateUser,
  handleDeleteUser: handleDeleteUser,
};
