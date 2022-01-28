const mongoose = require("mongoose");
const LexicalInfo = require("./lexical-info-model").schema;

// declares the sentence schema
const wordSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true, index: true },
  lexicalInfo: [LexicalInfo],
});

// export the schema as a model
module.exports = new mongoose.model("Word", wordSchema);
