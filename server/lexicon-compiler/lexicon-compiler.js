const readLine = require("readline");
const fs = require("fs");

exports.compile = async () => {
  const entries = {};

  files = fs.readdirSync("./portilex");

  for (file of files) {
    const lineReader = readLine.createInterface({
      input: fs.createReadStream(`./portilex/${file}`),
    });

    const posTag = file.slice(1, -4);

    for await (const entry of lineReader) {
      const [form, lemma, feats] = entry.split("\t");

      if (!(form in entries)) {
        entries[form] = [];
      }

      entries[form].push({ posTag, lemma, feats });
    }
  }

  let finalEntries = [];
  for (word in entries) {
    finalEntries.push({
      word,
      lexicalInfo: entries[word],
    });
  }

  return finalEntries;
};
