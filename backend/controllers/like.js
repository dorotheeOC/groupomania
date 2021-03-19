const db = require("../models");
const Post = db.posts;
const Like = db.likes;
const Op = db.Sequelize.Op;


exports.createOneLike = (req, res, next) => {  // ⚠️ Gérer le user_id en front ? 
  Like.findOne({ //UserId ne peut pas liker plusieurs fois un même postid
    where: { userId: req.body.userId, postId: req.params.id }
  })
  .then(like => {// incrémenter en front
    if (!like) {
      const like = {...req.body, postId: req.params.id };
      Like.create(like)
      .then(() => { 
        Post.increment("liked", {by: 1, where: {id: req.params.id}})
        .then(() => {
          res.status(200).json({ like: 1})
        })
        .catch(error => {
          res.status(500).json({error});
        });
      })
      .catch(error => res.status(400).json({error}));
    } else {
      Like.destroy({
          where: { userId: req.body.userId, postId: req.params.id }
        })
        .then(like => {
          if (like == 1) {
              Post.decrement("liked", {by: 1, where: {id: req.params.id}}).then(() => {
                res.status(200).json({ like: -1})
              })
          } else {
              res.status(400).json({ error })
          }
        })
        .catch(error => {
          res.status(500).json({error});
        });
    }
  })
  .catch(error => {
    res.status(400).json({error});
  });
};
