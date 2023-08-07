var express = require("express");
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
var jwt = require("jsonwebtoken");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const fs = require("fs");

const Joi = require("joi");
/* GET home page. */
router.get("/detail/:id", async (req, res) => {
  let id = req.params.id;
  let data = await prisma.blog.findMany({
    where: {
      id: +id,
    },
  });
  return res.send({ data });
});

router.get("/", async function (req, res, next) {
  // console.log(req.cookies["utoken"]);
  if (
    req.cookies["utoken"] == undefined ||
    req.cookies["utoken"] == "undefined"
  ) {
    res.render("login");
  } else {
    res.render("blog_detail");
  }
});

router.put("/comment/:id", async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  let b = await prisma.blog.update({
    where: { id: +id },
    data,
  });
  res.send(b);
});
module.exports = router;
