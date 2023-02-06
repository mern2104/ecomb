const express = require("express");
const chalk = require("chalk");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World asd");
});

app.listen(3000, function () {
  console.log(chalk.bgBlue("Port Running On 3000"));
});
