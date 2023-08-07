var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
var jwt = require("jsonwebtoken");
const { token } = require("morgan");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { Imagename } = require("../middlewere/filename");
const fs = require("fs");

const Joi = require("joi");

async function Admin_Login_Controller(req, res) {
  let { email, password } = req.body;
  let a = await prisma.admin.findFirst({ where: { email } });
  console.log(a);
  if (a != null) {
    bcrypt.compare(password, a.password, function (err, result) {
      if (result) {
        var token = jwt.sign({}, "admin");
        res.cookie("token", token);
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

module.exports = { Admin_Login_Controller };
