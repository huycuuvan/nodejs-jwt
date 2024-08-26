const { Op } = require("sequelize");
const { checkEmailExist, checkPhoneExist } = require("../helpers/Checked");
const { hashPassword, comparePassword } = require("../helpers/HashPassword");
const db = require("../models/index");

const getAllUser = async (id) => {
  let users = {};
  try {
    if (id == "ALL") {
      users = await db.User.findAll({
        include: {
          model: db.Group,
          attributes: ["name", "description"],
        },
        attributes: ["id", "username", "email", "phone", "address"],
        nest: true,
        raw: true,
      });
    }
    if (id && id !== "ALL") {
      users = await db.User.findOne({
        where: { id: id },
        attributes: ["id", "username", "email", "phone", "address"],
        include: {
          model: db.Group,
          attributes: ["name", "description"],
        },
        nest: true,
        raw: true,
      });
    }
    if (users) {
      return {
        EC: "0",
        EM: "Done",
        DT: users,
      };
    } else {
      return {
        EC: "2",
        EM: "Cannot found user",
        DT: users,
      };
    }
    // const roles = await db.Role.findAll({
    //   include: { model: db.Group, where: { id: id } },
    //   nest: true,
    //   raw: true,
    // });
    // console.log(users, roles);
    // return users;
  } catch (error) {
    return {
      EC: "1",
      EM: "Cannot Found",
      DT: "",
    };
  }
};
const getUserWithPanigation = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      include: {
        model: db.Group,
        attributes: ["name", "description"],
      },
      attributes: ["id", "username", "email", "phone", "address"],
    });

    let toltalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      toltalPages: toltalPages,
      users: rows,
    };
    return {
      EM: "Fetch Ok",
      EC: 0,
      DT: data,
    };
  } catch (error) {}
};
const createNewUser = async (data) => {
  let isEmailExist = await checkEmailExist(data.email);
  let isPhoneExist = await checkPhoneExist(data.phone);
  if (isEmailExist === true || isPhoneExist === true) {
    return {
      EM: "The email or phone is alreade exist",
      EC: 1,
    };
  }
  let hashPass = hashPassword(data.password);
  const newUser = await db.User.create({
    email: data.email,
    phone: data.phone,
    username: data.username,
    password: hashPass,
  });
  if (newUser) {
    return {
      EM: "Ok",
      EC: "0",
      Data: newUser,
    };
  } else {
    return {
      EM: "failed",
      EC: "2",
    };
  }
};
const userLogin = async (data) => {
  try {
    let user = await db.User.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      let isCorrectPass = comparePassword(data.password, user.password);
      if (isCorrectPass) {
        return {
          EM: "Ok",
          EC: 0,
          DT: {},
        };
      } else {
        return {
          EM: "Wrong password",
          EC: 3,
          DT: {},
        };
      }
    } else {
      return {
        EM: "Cannot found user",
        EC: 1,
        DT: {},
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  let user = await db.User.findOne({
    where: { id: id },
  });
  if (user) {
    await user.destroy();
  }
  return {
    EM: "Ok",
    EC: "0",
    Data: user,
  };
};
const createUser = async (data) => {
  const newUser = await db.User.create(data);
  if (newUser) {
    return {
      EM: "Ok",
      EC: "0",
      Data: newUser,
    };
  } else {
    return {
      EM: "failed",
      EC: "2",
    };
  }
};
module.exports = {
  getAllUser: getAllUser,
  createNewUser: createNewUser,
  userLogin: userLogin,
  getUserWithPanigation: getUserWithPanigation,
  deleteUser: deleteUser,
  createUser: createUser,
};
