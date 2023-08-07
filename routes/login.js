var express = require("express");
const Joi = require("joi");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const {
  User_Login_Controller,
} = require("../controller/User_Login_Controller");
/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log(req.cookies["utoken"]);
  if (
    req.cookies["utoken"] == undefined ||
    req.cookies["utoken"] == "undefined"
  ) {
    res.render("login");
  } else {
    res.render("index");
  }
});

router.post("/", async (req, res) => {
  User_Login_Controller(req, res);
});

router.post("/logout", async (req, res) => {
  res.cookie("utoken");
  res.send({ msg: "Logged out" });
});
module.exports = router;
