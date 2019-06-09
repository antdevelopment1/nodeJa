const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true
});

// Essentially a new class or model
const User = mongoose.model("User", {
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

// This is a new instance of User
const me = new User({
  name: "April",
  age: 28
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch(error => {
    console.log("error", error);
  });
