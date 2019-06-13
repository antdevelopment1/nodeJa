const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// How to send a general request that the site is down and will be back up based on any request that is sent
app.use((req, res, next) => {
  res.status(503).send("The site is currently down. Check back soon!");
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Listening on port " + port);
});

const jwt = require("jsonwebtoken");
