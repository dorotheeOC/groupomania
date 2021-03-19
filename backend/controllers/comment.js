const db = require("../models");
const Comment = db.comments;
const User = db.users;
const Post = db.posts;
const Op = db.Sequelize.Op;

exports.getAllReportedComments = (req, res, next) => {
  Comment.findAll( { where: {reported: 1} })
  .then(comments => res.status(200).json(comments))
  .catch(error => res.status(404).json({ error }));
};

exports.createOneComment = (req, res, next) => {
  User.findByPk(req.body.userId)
  .then((author) => {
    const comment = {...req.body, postId: req.params.id, author: author.email};
    Comment.create(comment)
      .then(() => {
        Post.increment("commented", {by: 1, where: {id: req.params.id}})
        .then(() => {
          res.status(200).json(comment)
        })
        .catch(error => {
          res.status(500).json({error});
        });
      })
      .catch(error => {
          res.status(500).json({error});
      })
  })
  .catch(error => res.status(400).json({error})); 
};

exports.updateOneComment = (req, res) => {  
    Comment.update(req.body, {
      where: { id: req.params.id }
    })
    .then(comment => {
      if (comment == 1) {
          res.status(200).json({ message: 'Commentaire modifié !'})
      } else {
          res.status(400).json({ error })
      }
    })
    .catch(error => {
      res.status(500).json({error});
    });
};

exports.deleteOneComment = (req, res) => {
  Comment.findByPk(req.params.id)
  .then((comment) => {
    let postId = comment.postId
    Comment.destroy({
      where: { id: req.params.id }
    })
    .then(comment => {
      if (comment == 1) {
        Post.decrement("commented", {by: 1, where: {id: postId}})
        .then(() => {
          res.status(200).json({ message: 'Commentaire supprimé'})
        })
      } else {
          res.status(400).json({ error })
      }
    })
    .catch(error => {
      res.status(500).json({error});
    });
  })
  .catch(error => {
    res.status(500).json({error});
  }); 
};