const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("in this profile route cokkie: ", req.cookies);
  console.log("passport checking");
  res.status(200).send("My dear user you are authorized");
});
module.exports = router;
