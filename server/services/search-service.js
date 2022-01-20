const Word = require("../models/word-model");

// searches for words in the lexicon
exports.searchWords = async (searchTerm) => {
  return await Word.find({ word: new RegExp("^" + searchTerm + "$", "i") });
};

// searches for words in the lexicon
exports.deleteEveryWord = async () => {
  return await Word.deleteMany({}).exec();
};

// stores many words in the database
exports.storeManyWords = async (words) => {
  try {
    return Word.collection.insert(words, () => {});
  } catch (error) {
    // in case of error...
    console.log("DATABASE ERROR! Could not create post");
    console.log(error);

    throw error;
  }
};
