const express = require("express");
const chalk = require("chalk");
const app = express();

app.get("/", function (req, res) {
  res.json([
    {
      name: "shawon",
    },
    {
      name: "alif",
    },
    {
      name: "arif",
    },
    {
      name: "shohel",
    },
    {
      name: "nayan",
    },
  ]);
});

app.get("/test", function (req, res) {
  res.json([
    {
      message: "Successful Try",
    },
  ]);
});

app.listen(3000, function () {
  console.log(chalk.bgBlue("Port Running On 3000"));
});
