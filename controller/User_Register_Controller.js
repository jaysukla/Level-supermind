var express = require("express");
const Joi = require("joi");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function User_Register_Controller(req, res) {
  let { fullname, email, password, dob } = req.body;

  let u = await prisma.user.findFirst({ where: { email } });

  if (u == null) {
    const schema = Joi.object({
      fullname: Joi.string().min(3).max(25).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      dob: Joi.date().max("now").required(),
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.send({ msg: error.details[0].message });
    } else {
      dob = dob + "T00:00:00.000Z";

      bcrypt.hash(password, 5, async function (err, hash) {
        let data = {
          fullname,
          email,
          password: hash,
          dob,
        };
        let user = await prisma.user.create({
          data,
        });

        return res.send({ msg: "Registration successfull", user: user });
      });
    }
  } else {
    return res.send({ msg: "User already exist login please" });
  }
}

module.exports = { User_Register_Controller };
