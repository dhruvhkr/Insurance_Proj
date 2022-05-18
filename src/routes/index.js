module.exports = (app) => {
  app.use("/api/policy", require("../policy/index"));
};
