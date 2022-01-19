const readLine = require("readline");
const fs = require("fs");

exports.compile = async () => {
  // holds every entry in the lexicon
  let entries = [];

  // open lexicon's master file
  let lineReaderMaster = readLine.createInterface({
    input: fs.createReadStream("./portilex/WORDmaster.txt"),
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
      let lineReaderPosTag;
      // open pos tag's file
      lineReaderPosTag = readLine.createInterface({
        input: fs.createReadStream(`./portilex/_${posTag}.tsv`),
      });

      // iterates through file's lines
      let foundIt = false;
      for await (const entry of lineReaderPosTag) {
        let [posTagWordForm, lemma, feats] = entry.split("\t");

        // stores word's pos tag, lemma and feature
        if (form === posTagWordForm) {
          wordRec["lexicalInfo"].push({
            posTag: posTag,
            lemma: lemma,
            features: feats,
          });
          foundIt = true;
        } else if (foundIt) {
          break;
        }
      }
    }

    entries.push(wordRec);
    console.log(entries.length);
  }

  console.log("Writing compiled lexicon...");
  fs.writeFileSync("./portilex.json", JSON.stringify(entries));
  console.log("Lexicon compiled successfully!");
};
