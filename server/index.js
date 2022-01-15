// requires
const express = require("express");
const mongoose = require("mongoose");
const searchRouter = require("./routes/search-routes");
const lexiconCompiler = require("./lexicon-compiler/lexicon-compiler");

// compiles lexicon
console.log("Compiling the lexicon...");
lexiconCompiler.compile();
console.log("Lexicon successfully compiled!");

// declaring the express app
const app = express();

// connect to MongoDB database
const mongoUser = "root";
const mongoPass = "example";
mongoose
  .connect("mongodb://mongo:27017/portilex", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: { username: mongoUser, password: mongoPass },
    authSource: "admin",
  })
  .then((res) => {
    console.log("Connected successfully to the database!");
  })
  .catch((err) => {
    console.log("Failed to connect to the database!");
    console.log(err);
  });

app.use("/search", searchRouter);

// listening on the port 5000
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
