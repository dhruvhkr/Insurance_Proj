const express = require("express");
const connectToDB = require("./src/util/connectToDB");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 4000;

connectToDB();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());

require("./src/routes/index")(app);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
