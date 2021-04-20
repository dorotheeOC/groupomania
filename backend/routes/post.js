const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const postCtrl = require("../controllers/post");
const commentCtrl = require("../controllers/comment");
const likeCtrl = require("../controllers/like");

/////POSTS
router.post("/", auth, postCtrl.createOnePost);
router.get("/:id", auth, postCtrl.getOnePost);
router.get("/", auth, postCtrl.getAllPost);
router.put("/:id", auth, postCtrl.updateOnePost);
router.delete("/:id", auth, postCtrl.deleteOnePost);

/////COMMENTS
router.post("/:id/comments", auth, commentCtrl.createOneComment);
router.put("/:id/comments/:id", auth, commentCtrl.updateOneComment);
router.delete("/:id/comments/:id", auth, commentCtrl.deleteOneComment);

/////LIKES
router.post("/:id/likes", auth, likeCtrl.createOneLike);
  
module.exports = router;