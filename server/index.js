// requires
const express = require("express");
const mongoose = require("mongoose");
const searchRouter = require("./routes/search-routes");
const lexiconCompiler = require("./lexicon-compiler/lexicon-compiler");
const lexiconCompressor = require("./lexicon-compiler/lexicon-compressor");
const searchService = require("./services/search-service");

// compresses lexicon
console.log("Compressing the lexicon...");
lexiconCompressor.compress().then(() => {
  console.log("The lexicon has been successfully compressed!");
});
// compiles lexicon
console.log("Compiling the lexicon...");
lexiconCompiler.compile().then((lexicon) => {
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
    .then(async (res) => {
      console.log(`The lexicon has ${lexicon.length} entries!`);
      await searchService.storeManyWords(lexicon);
      console.log("Connected successfully to the database!");
    })
    .catch((err) => {
      console.log("Failed to connect to the database!");
      console.log(err);
    });
});

// declaring the express app
const app = express();

app.use(express.json());
app.use("/search", searchRouter);

// listening on the port 5000
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
