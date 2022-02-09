const readLine = require("readline");
const fs = require("fs");

// A simple file to compress the whole portilexicon
// into one single file, in order to make it available
// for the user to download it

exports.compress = async () => {
  let fileText = [];

  files = fs.readdirSync("./portilex");

  for (file of files) {
    const lineReader = readLine.createInterface({
      input: fs.createReadStream(`./portilex/${file}`),
    });

    const posTag = file.slice(1, -4);

    for await (const entry of lineReader) {
      const [form, lemma, feats] = entry.split("\t");

      fileText.push(`${form}\t${lemma}\t${posTag}\t${feats}\n`);
    }
  }

  // sorts the entries alphabetically
  fileText.sort();

  const portilexiconPath = "./compressed-portilex/portilex.tsv";

  // delete previously created file (if it exists)

  if (fs.existsSync(portilexiconPath)) {
    fs.unlinkSync(portilexiconPath);
  }

  // writes each line in the file
  let stream = fs.createWriteStream(portilexiconPath, {
    flags: "a",
  });
  for (let line of fileText) {
    stream.write(line);
  }
  stream.end();
};
