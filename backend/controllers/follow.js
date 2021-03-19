const db = require("../models");
const User = db.users;
const Follow = db.follows;
const Op = db.Sequelize.Op;

exports.createOneFollow = (req, res, next) => {  // ⚠️ Gérer le user_id en front ? 
    Follow.findOne({ //UserId ne peut pas liker plusieurs fois un même postid
      where: { userId: req.body.userId, userFollowed: req.params.id }
    })
    .then(follow => {// incrémenter en front
      if (!follow) {
        const follow = {...req.body, userFollowed: req.params.id };
        Follow.create(follow)
        .then(() => { 
          User.increment("followers", {by: 1, where: {id: req.params.id}})
          .then(() => {
            res.status(200).json({ follow: 1})
          })
            .catch(error => {
              res.status(500).json({error});
          });
        })
        .catch(error => res.status(400).json({error}));
      } else {
        Follow.destroy({
            where: { userId: req.body.userId, userFollowed: req.params.id }
          })
          .then(follow => {
            if (follow == 1) {
                User.decrement("followers", {by: 1, where: {id: req.params.id}}).then(() => {
                  res.status(200).json({ follow: -1})
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
exports.getAllFav = (req, res, next) => {
  Follow.findAll( { 
    where: { userId: req.query.id },
  })
  .then(user => res.status(200).json(user))
  .catch(error => res.status(404).json({ error }));
};