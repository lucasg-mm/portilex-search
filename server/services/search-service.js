const Word = require("../models/word-model");

// searches for words in the lexicon
exports.searchWords = async (searchTerm) => {
  return await Word.find({ word: new RegExp("^" + searchTerm + "$", "i") });
};

// stores many words in the database
exports.storeManyWords = async (words) => {
  try {
    console.log("Deleting everything from database!");
    try {
      await Word.collection.drop();
    } catch (e) {
      console.log(e);
    }
    console.log("Seeding database...");
    await Word.collection.insert(words);
    console.log("Database seeded");
    return;
  } catch (error) {
    // in case of error...
    console.log("DATABASE ERROR! Could not create post");
    console.log(error);

    throw error;
  }
};
