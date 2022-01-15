const readLine = require("readline");
const fs = require("fs");

exports.compile = async () => {
  // holds every entry in the lexicon
  let entries = [];

  // open lexicon's master file
  let lineReaderMaster = readLine.createInterface({
    input: fs.createReadStream("./portilex/master"),
  });

  // iterate through the master file lines (which are words)
  for await (const word of lineReaderMaster) {
    // saves a word record (has the lexicon info about it)
    let wordRec = {};

    // split in the comma
    let [form, posTags] = word.split(",");

    // store word's form and place to put a feature array with lexical info
    // of different pos tags
    wordRec["word"] = form;
    wordRec["lexicalInfo"] = [];

    // splits word's pos tags
    posTags = posTags.split(" ");

    // iterate through word's pos tags
    for (let posTag of posTags) {
      // open pos tag's file
      let lineReaderPosTag = readLine.createInterface({
        input: fs.createReadStream(`./portilex/${posTag}`),
      });

      // iterates through file's lines
      for await (const entry of lineReaderPosTag) {
        let [posTagWordForm, lemma, feats] = entry.split(",");

        // stores word's pos tag, lemma and feature
        if (form === posTagWordForm) {
          wordRec["lexicalInfo"].push({
            posTag: posTag,
            lemma: lemma,
            features: feats,
          });
        }
      }
    }

    entries.push(wordRec);
  }

  return entries;
};
