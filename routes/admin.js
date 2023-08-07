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
// Controllers Importing
const {
  Create_Blog_Controller,
  Get_Blogs_Controller,
  BLOG_UPDATE_Controller,
  Blog_Visibility_Controller,
} = require("../controller/Blog_Controller");
const { Logout_Controller } = require("../controller/Admin_Logout_Controller");
const {
  Admin_Login_Controller,
} = require("../controller/Admin_Login_Controller");
// Controllers Importing
/* GET users listing. */

router.get("/", function (req, res, next) {
  console.log(req.cookies["token"]);

  if (
    req.cookies["utoken"] == undefined ||
    req.cookies["utoken"] == "undefined"
  ) {
    res.render("login");
  } else {
    res.render("admin");
  }
});

router.get("/login", function (req, res, next) {
  res.render("admin_login");
});

router.post("/login", async function (req, res) {
  Admin_Login_Controller(req, res);
});

router.post("/logout", function (req, res) {
  Logout_Controller(req, res);
});

router.post("/create-blog", upload.single("file"), async (req, res) => {
  Create_Blog_Controller(req, res);
});

router.get("/blogs", async (req, res) => {
  Get_Blogs_Controller(req, res);
});

router.delete("/blog/delete/:id", async (req, res) => {
  let id = req.params.id;
  let b = await prisma.blog.delete({ where: { id: +id } });
  res.send({ msg: "deleted ", blog: b });
});

router.put("/blog/visibility/:id/:type", async (req, res) => {
  Blog_Visibility_Controller(req, res);
});

router.put("/blog/update/:id", upload.single("file"), async (req, res) => {
  BLOG_UPDATE_Controller(req, res);
});

module.exports = router;
