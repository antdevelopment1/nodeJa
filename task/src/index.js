const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
  //   console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }

  //   Traditional Promise Chaining
  //   user
  //     .save()
  //     .then(() => {
  //       res.status(201).send(user);
  //     })
  //     .catch(error => {
  //       res.status(400).send(error);
  //     });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }

  //   Traditional proise chainging code
  //   User.find({})
  //     .then(users => {
  //       res.send(users);
  //     })
  //     .catch(error => {
  //       res.status(500).send();
  //     });
});

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    // console.log(user);
    if (!user) {
      return res.status(404).send();
    }
  } catch (error) {
    res.status(500).send();
  }
  // Traditional Promise Chaining Code
  //   User.findById(_id)
  //     .then(user => {
  //       //   console.log(user);
  //       console.log(!user);
  //       if (!user) {
  //         return res.status(404).send();
  //       }
  //       res.send(user);
  //     })
  //     .catch(e => {
  //       res.status(500).send();
  //     });
});

app.post("/tasks", async (req, res) => {
  //   console.log(req.body);
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }

  //   Traditional Promise Chaining Code
  //   task
  //     .save()
  //     .then(() => {
  //       res.status(201).send(task);
  //     })
  //     .catch(error => {
  //       res.status(400).send(error);
  //     });
});

app.get("/tasks", async (req, res) => {
  try {
    const task = await Task.find({});
    res.send(task);
    // console.log(task);
  } catch (error) {
    res.status(500).send();
  }

  // Traditional Promise Chaining
  //   Task.find({})
  //     .then(tasks => {
  //       res.send(tasks);
  //     })
  //     .catch(() => {
  //       res.status(500).send();
  //     });
});

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }

  // Traditional Promise Chaining Code
  //   Task.findById(_id)
  //     .then(task => {
  //       if (!task) {
  //         return res.status(404).send();
  //       }
  //       res.send(task);
  //     })
  //     .catch(error => {
  //       res.status(500).send();
  //     });
});

app.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    // console.log(user);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    // console.log(task);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    console.log(task);
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
