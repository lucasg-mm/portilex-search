const searchService = require("../services/search-service");

// searches the Portilex lexicon
exports.apiSearchLexicon = async (req, res, next) => {
  try {
    // gets the request's properties
    const { searchTerm } = req.body;

    // parses the object to conllu text
    const results = await searchService.searchWords(searchTerm);

    // sends results url
    res.json(results);
  } catch (error) {
    // in case of error, send a message and the error object
    res.status(500).json({ message: "Internal error", error: error });
  }
};
