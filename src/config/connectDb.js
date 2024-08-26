const { Sequelize } = require("sequelize");
const connectDb = async () => {
  const sequelize = new Sequelize("jwt", "root", null, {
    host: "localhost",
    dialect: "mysql",
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDb;
