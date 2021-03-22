const db = require("../models");
const Post = db.posts;
const Comment = db.comments;
const User = db.users;
const Like = db.likes;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  console.log(data.count)
  const { count: totalItems, rows: posts } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, posts, totalPages, currentPage };
};

exports.getAllPost = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const search = req.query.search;
  let condition = search ? {
    [Op.or]: [
      { title: { [Op.like]: `%${search}%` } },
      { postContent: { [Op.like]: `%${search}%` } }
    ]
  } : null;
  const id = req.query.id;
  let userfilter = id ? {userId: id} : null
  Post.findAndCountAll({ 
    limit, 
    offset,
    where: {
        [Op.and] : [condition, userfilter]
    },
    order: [
      ['createdAt', 'DESC']
    ],
   })
    .then(data => {
      const response = getPagingData(data, page, limit);
      Post.findAll()
      .then(post => res.status(200).json({response, post}))
      .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(500).json({error}))
};

exports.createOnePost = (req, res, next) => {  // ⚠️ Gérer le user_id en front ? 
    User.findByPk(req.body.userId)
    .then((author) => {
      const post = {...req.body, author: author.email};
      console.log(post);
      Post.create(post)
      .then(() => res.status(201).json(post))
      .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(400).json({error})); 
};

exports.getOnePost = (req, res, next) => {
  return Post.findByPk(req.params.id, { include: ["postComment", "postLike"] })
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }));
};

exports.updateOnePost = (req, res, next) => {  
    Post.update(req.body, {
      where: { id: req.params.id }
    })
    .then(post => {
      if (post == 1) {
          res.status(200).json({ message: 'Post modifié !'})
      } else {
          res.status(400).json({ error })
      }
    })
    .catch(error => {
      res.status(500).json({error});
  });
};

exports.deleteOnePost = (req, res, next) => { 
    Post.destroy({
      where: { id: req.params.id }
    })
    .then(post => {
      if (post == 1) {
          res.status(200).json({ message: 'Post supprimé !'})
      } else {
          res.status(400).json({ error })
      }
    })
    .catch(error => {
      res.status(500).json({error});
    });
};
