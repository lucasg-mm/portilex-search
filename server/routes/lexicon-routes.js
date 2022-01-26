// requires
const express = require("express");
const router = express.Router();
const lexiconController = require("../controllers/lexicon-controller");

// route to search the Portilex lexicon
router.get("/download", lexiconController.apiDownloadLexicon);

module.exports = router;
