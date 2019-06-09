const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

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

    // db.collection("users").insertOne(
    //   {
    //     name: "April",
    //     age: 28
    //   },
    //   (error, result) => {
    //     if (error) {
    //       console.log("Unable to insert user");
    //     }

    //     console.log(result.ops);
    //   }
    // );
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Jen",
    //       age: 23
    //     },
    //     {
    //       name: "August",
    //       age: 22
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       console.log("Couldn't insert users");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // Create a get tasks collection
    // Make three that have a description and completion value
    // Integrate error handeling
    // Check it with robo T
    db.collection("tasks").insertMany(
      [
        {
          description: "Take out trash",
          completed: false
        },
        {
          description: "Get ice cream",
          completed: false
        },
        {
          description: "Go to texas roadhouse",
          completed: true
        }
      ],
      (error, result) => {
        if (error) {
          console.log(error);
        }
        console.log(result.ops);
      }
    );
  }
);
