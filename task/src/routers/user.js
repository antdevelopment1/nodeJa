const express = require("express");
const User = require("./../models/user");
const router = express.Router();

router.get("/users", (req, res) => {
  res.send("");
});

router.get("/users", async (req, res) => {
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

router.get("/users/:id", async (req, res) => {
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

router.post("/users", async (req, res) => {
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

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);

  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    updates.forEach(update => {
      user[update] = req.body[update];
    });

    await user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/:id", async (req, res) => {
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

module.exports = router;
