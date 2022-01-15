// requires
const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search-controller");

// route to search the Portilex lexicon
router.post("/", searchController.apiSearchLexicon);

module.exports = router;
