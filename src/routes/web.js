const express = require("express");
const userController = require("../controllers/userController");
const groupController = require("../controllers/groupController");
const router = express.Router();
const initRouter = (app) => {
  router.get("/");
  router.post("/api/register", userController.handleRegister);
  router.post("/api/login", userController.handleLogin);
  // CRUD user
  router.get("/api/get-all-users", userController.handleGetAllUser);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleUpdateUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  // group
  router.get("/api/get-all-group", groupController.handleGetAllGroup);
  return app.use("/", router);
};

module.exports = initRouter;
