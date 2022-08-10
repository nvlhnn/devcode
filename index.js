const express = require("express");
require("dotenv").config();

const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 3030;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.use(errorHandler);
app.listen(port, async () => {
  console.log(process.env.MYSQL_DBNAME);
  console.log(process.env.MYSQL_USER);
  console.log(process.env.MYSQL_PASSWORD);
  console.log(process.env.MYSQL_HOST);
  console.log(process.env.PORT);
  console.log(`Example app listening on port ${port}`);
});
