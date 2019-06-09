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

    db.collection("users")
      .find({ age: 28 })
      .toArray((error, users) => {
        console.log(users);
      });

    db.collection("users")
      .find({ age: 28 })
      .count((error, count) => {
        console.log(count);
      });
  }
);
