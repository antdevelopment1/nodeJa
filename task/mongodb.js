const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  {
    useNewUrlParser: true
  },
  (error, client) => {
    if (error) {
      return console.log("There was an error connecting to the database.");
    }

    const db = client.db(databaseName);

    // Retrieve Function
    // db.collection("users").findOne(
    //   { _id: new ObjectID("5cfc68f707cbdb513c99c00a") },
    //   (error, user) => {
    //     if (error) {
    //       console.log("Unable to find user");
    //     }

    //     console.log(user);
    //   }
    // );

    // db.collection("users")
    //   .find({ age: 28 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // db.collection("users")
    //   .find({ age: 28 })
    //   .count((error, count) => {
    //     console.log(count);
    //   });

    db.collection("tasks")
      .find()
      .sort({ _id: -1 })
      .toArray((error, tasks) => {
        console.log(tasks[tasks.length - 1]);
      });

    db.collection("tasks").findOne(
      { _id: new ObjectID("5cfc65afae8cb350a2f7dc3d") },
      (error, task) => {
        console.log(task);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        console.log(tasks);
      });
  }
);
