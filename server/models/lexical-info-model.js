const mongoose = require("mongoose");

// declares the lexical info schema
const lexicalInfoSchema = new mongoose.Schema({
  posTag: { type: String, required: true },
  lemma: { type: String, required: true },
  feats: { type: String, required: true },
});

// export the schema as a model
module.exports = new mongoose.model("LexicalInfo", lexicalInfoSchema);
