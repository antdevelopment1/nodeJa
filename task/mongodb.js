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

    db.collection("users")
      .deleteMany({
        name: "April"
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });

    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: false
    //     },
    //     {
    //       $set: {
    //         completed: true
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // db.collection("users");
    //   .updateOne(
    //     {
    //       _id: new ObjectID("5cfc60079d5dbf4fa01b3473")
    //     },
    //     {
    //       $inc: {
    //         age: 1
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
);
