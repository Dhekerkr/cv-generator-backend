const express = require("express");
const router = express.Router();
const { getUserData } = require("../controllers/userDatacontroller");

router.get("/:userId", getUserData);

module.exports = router;
