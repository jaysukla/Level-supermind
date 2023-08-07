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

function Logout_Controller(req, res) {
  res.cookie("token");
  return res.render("admin_login");
}

module.exports = { Logout_Controller };
