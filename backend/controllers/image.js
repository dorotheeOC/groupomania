const fs = require("fs");

const db = require("../models");
const Image = db.images;
const User = db.users;

exports.uploadImage = (req, res, next) => {
  Image.findOne({where: {userId : req.body.userId}})
  .then((image) => {
    if(!image) {
      Image.create({
        userId: req.body.userId,
        type: req.file.mimetype,
        name: req.file.filename,
      })
      .then(() => {
        res.status(200).json({message: 'Image enregistrée', file: req.file.filename});
      })
      .catch((error) => {
        console.log(error);
        res.status(500)('Une erreur s\'est produite pendant le téléchargement');
      })
    } else {
      fs.unlink(`images/${image.name}`, () => {
        Image.destroy({where: {userId: req.body.userId}})
        Image.create({
          userId: req.body.userId,
          type: req.file.mimetype,
          name: req.file.filename,
        })
        .then(() => {
          res.status(200).json({message: 'Image modifiée', file: req.file.filename});
        })
        .catch((error) => {
          res.status(500)('Une erreur s\'est produite pendant le téléchargement');
        })
      }) 
    }
  })

    
};
