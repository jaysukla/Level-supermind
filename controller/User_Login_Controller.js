var express = require("express");
const Joi = require("joi");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

async function User_Login_Controller(req, res) {
  let { email, password } = req.body;
  let a = await prisma.user.findFirst({ where: { email } });

  if (a != null) {
    bcrypt.compare(password, a.password, function (err, result) {
      if (result) {
        var token = jwt.sign({}, "user");
        res.cookie("utoken", token);
        console.log(req.cookies);

        return res.send({ msg: "login Success", token: token });
      } else {
        return res.send({ msg: "wrong Cridentials" });
      }
    });
  } else {
    return res.send({ msg: "wrong Cridentials" });
  }
}

module.exports = { User_Login_Controller };
