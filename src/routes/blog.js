const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const blogController = require("../controlers/blog");

// [POST] : /v1/blog/post
router.post("/post", [body("title").isLength({ min: 5 }).withMessage("Input title minimal lima karakter"), body("body").isLength({ min: 5 }).withMessage("Input body minimal lima karakter")], blogController.createBlogPost);
router.get("/posts", blogController.getAllBlogPost);
router.get("/post/:postId", blogController.getBlogPostById);
router.put("/post/:postId", [body("title").isLength({ min: 5 }).withMessage("Input title minimal lima karakter"), body("body").isLength({ min: 5 }).withMessage("Input body minimal lima karakter")], blogController.updateBlogPost);
router.delete('/post/:postId', blogController.deleteBlogPost)

module.exports = router;
