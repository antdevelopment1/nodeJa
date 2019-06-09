const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

// Add
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: function(argv) {
    console.log("Title: " + argv.title);
  }
});
// Remove
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title"
    }
  },
  handler: function(argv) {
    console.log("Note has been removed");
  }
});

// Read
yargs.command({
  command: "read",
  describe: "Read a note",
  handler: function() {
    console.log("This note has been read");
  }
});

// List
yargs.command({
  command: "list",
  describe: "List all notes",
  builder: {
    title: {
      describe: "List all notes"
    }
  },
  handler: function(argv) {
    console.log("Listing all notes", argv);
  }
});

console.log(yargs.parse());
