const fs = require("fs");

// download a file (through get request)
exports.apiDownloadLexicon = async (req, res, next) => {
  try {
    const fileDir = "./compressed-portilex/portilex.tsv";

    // read file through stream
    let filestream = fs.createReadStream(fileDir);

    // send file back to client as download
    res.set({
      "Content-Disposition": `attachment; filename=portilexicon-ud.tsv`,
      "Content-Type": "text/plain",
    });

    filestream.pipe(res);
  } catch (error) {
    // in case of error, send a message and the error object
    res.status(500).json({ message: "Internal error", error: error });
  }
};
