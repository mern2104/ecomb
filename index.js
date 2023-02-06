const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const usersRouter = require("./routes/usersRoute");
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", usersRouter);

app.listen(3000, function () {
  console.log(chalk.bgBlue("Port Running On 3000"));
});
