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

async function Create_Blog_Controller(req, res) {
  const uploadPath = "public/images/";
  let {
    blogCategory,
    blogName,
    seoTitle,
    seoDescription,
    seoKeyword,
    blogContent,
  } = req.body;
  let file = req.file;
  let i = Imagename();

  const validator = Joi.object({
    blogCategory: Joi.string().required(),
    blogName: Joi.string().max(150).required(),
    seoTitle: Joi.string().min(0).max(150),
    seoDescription: Joi.string().min(0).max(150),
    seoKeyword: Joi.string().min(0).max(150),
    blogContent: Joi.string().min(0).max(1000),
    file: Joi.string().valid("image/png", "image/jpeg"),
  });
  const { error, value } = validator.validate({
    blogCategory,
    blogName,
    seoTitle,
    seoDescription,
    seoKeyword,
    blogContent,
  });

  if (error) {
    return res.send(error);
  } else {
    if (file != undefined) {
      ////
      const schema = Joi.object({
        file: Joi.string()
          .valid("image/png", "image/jpeg")
          .required()
          .error(
            new Error(
              "Invalid file type. Only PNG and JPEG images are allowed."
            )
          ),
      });

      const { error } = schema.validate({ file: file.mimetype });

      if (error) {
        return res.send({ msg: "please use image/png or image/jpeg " });
      }

      if (file.buffer.length > 2000000) {
        return res.send({ msg: "File size is too long " });
      } else {
        const filePath = uploadPath + `${i}.jpeg`;

        fs.writeFile(filePath, file.buffer, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to upload file" });
          }
        });
      }

      ///
    } else {
      i = "";
    }

    let b = await prisma.Blog.create({
      data: {
        blogCategory,
        blogName,
        seoTitle,
        seoDescription,
        seoKeyword,
        blogContent,
        Image: `${i}.jpeg`,
        comment: JSON.stringify([]),
      },
    });

    return res.send({ msg: "blog is created", blog: b });
  }
}

async function Get_Blogs_Controller(req, res) {
  let data = await prisma.blog.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
  return res.send({ data });
}

//  BloG UPDDATE

async function BLOG_UPDATE_Controller(req, res) {
  let id = req.params.id;
  console.log(req.body);
  const uploadPath = "public/images/";
  let {
    blogCategory,
    blogName,
    seoTitle,
    seoDescription,
    seoKeyword,
    blogContent,
    Image,
  } = req.body;
  let file = req.file;
  let i = Imagename();

  const validator = Joi.object({
    blogCategory: Joi.string().required(),
    blogName: Joi.string().max(150).required(),
    seoTitle: Joi.string().min(0).max(150),
    seoDescription: Joi.string().min(0),
    seoKeyword: Joi.string().min(0).max(150),
    blogContent: Joi.string().min(0).max(1000),
    file: Joi.string().valid("image/png", "image/jpeg"),
  });
  const { error, value } = validator.validate({
    blogCategory,
    blogName,
    seoTitle,
    seoDescription,
    seoKeyword,
    blogContent,
  });

  if (error) {
    return res.send(error);
  } else {
    if (file != undefined) {
      ////
      const schema = Joi.object({
        file: Joi.string()
          .valid("image/png", "image/jpeg")
          .required()
          .error(
            new Error(
              "Invalid file type. Only PNG and JPEG images are allowed."
            )
          ),
      });

      const { error } = schema.validate({ file: file.mimetype });

      if (error) {
        return res.send({ msg: "please use image/png or image/jpeg " });
      }

      if (file.buffer.length > 2000000) {
        return res.send({ msg: "File size is too long " });
      } else {
        i = `${i}.jpeg`;
        const filePath = uploadPath + i;

        fs.writeFile(filePath, file.buffer, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to upload file" });
          }
        });
      }

      ///
    } else {
      i = Image;
    }

    let b = await prisma.Blog.update({
      where: { id: +id },
      data: {
        blogCategory,
        blogName,
        seoTitle,
        seoDescription,
        seoKeyword,
        blogContent,
        Image: i,
      },
    });

    return res.send({ msg: "blog is updated", blog: b });
  }
}

// Blog Visibility

async function Blog_Visibility_Controller(req, res) {
  let id = req.params.id;
  let type = req.params.type;
  let v;
  if (+type == 1) {
    v = 0;
  } else {
    v = 1;
  }

  let b = await prisma.blog.update({
    where: { id: +id },
    data: {
      visible: v,
    },
  });

  return res.send(b);
}

module.exports = {
  Create_Blog_Controller,
  Get_Blogs_Controller,
  BLOG_UPDATE_Controller,
  Blog_Visibility_Controller,
};
