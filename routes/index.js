var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  // console.log(req.cookies["utoken"]);
  if (
    req.cookies["utoken"] == undefined ||
    req.cookies["utoken"] == "undefined"
  ) {
    res.render("login");
  } else {
    res.render("index");
  }
});

module.exports = router;
