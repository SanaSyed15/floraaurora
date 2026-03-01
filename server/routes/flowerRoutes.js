const express = require("express");
const router = express.Router();
const { getFlowers } = require("../controllers/flowerController");

router.get("/", getFlowers);

module.exports = router;
