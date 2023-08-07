var express = require("express");
const Joi = require("joi");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const {
  User_Register_Controller,
} = require("../controller/User_Register_Controller");
/* GET users listing. */
router.get("/", function (req, res, next) {
  if (
    req.cookies["utoken"] == undefined ||
    req.cookies["utoken"] == "undefined"
  ) {
    res.render("register");
  } else {
    res.render("index");
  }
});

router.post("/", async (req, res) => {
  User_Register_Controller(req, res);
});
module.exports = router;
