const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true
});

// Essentially a new class or model
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain password");
      }
    }
  }
});

const me = new User({
  name: "   Eric W  ",
  email: "  Mike@calM.com",
  password: "passstop"
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch(error => {
    console.log("error", error);
  });

// Task class model
const Task = mongoose.model("Task", {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

// Creating a task instance
const task = new Task({
  description: "Finish current node js section",
  completed: true
});

Using a built in method of this instance from mongoose
task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch(error => {
    console.log("error", error);
  });
// This is a new instance of User
