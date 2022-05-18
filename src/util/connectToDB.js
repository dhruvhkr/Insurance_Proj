const mongoose = require("mongoose");
const chalk = require("chalk");

const connectToDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(
      chalk.bgCyan.blue("Db connected", connection?.connections[0]?.port)
    );
  } catch (err) {
    console.log(chalk.red(err));
  }
};

module.exports = connectToDB;
