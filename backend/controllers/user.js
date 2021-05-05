const fs = require("fs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require("../models");

const User = db.users;
const Image = db.images;
const Follow = db.follows;
const Op = db.Sequelize.Op;

exports.signup = (req, res, next) => {
    const regex = /[='<>/]/g;
    const passwordValid = req.body.password.match(regex);
    if(!passwordValid) {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
            email: req.body.email,
            password: hash
            });
            user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ message: 'Ton email existe déjà !' }));
        })
        .catch(error => res.status(500).json({ error }));
    } else {
        res.status(400).json({ message: 'Caractères spéciaux non autorisés'})
    }
};

exports.login = (req, res, next) => {
    User.findOne({
        where:{ email: req.body.email }})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        process.env.SECRET_TOKEN,
                        { expiresIn: '24h' }
                    )
                });
                
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    return User.findByPk(req.params.id, { include: ["userFollow", "userImage"] })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};
exports.getAllUsers = (req, res, next) => {
    User.findAll( { include: ["userFollow"] })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};
exports.modifyOneUser = (req, res, next) => {
    console.log(req.body)
    const user = req.body;
    User.update(user, {
      where: { id: req.params.id }
    })
    .then(user => {
        if (user == 1) {
            res.status(200).json({ message: 'Profil modifié !'});
        } else {
            res.status(400).json({ error });
        }
    })
    .catch(error => {
        res.status(500).json({error});
    });
};
exports.deleteOneUser = (req, res, next) => {  
    Image.findOne({ 
        where: { userId: req.params.id}
    })
    .then(image => {
        const filename = image.name
        fs.unlink(`images/${filename}`, () => {
            User.destroy({
                where: { id: req.params.id }
              })
                .then(user => {
                  if (user == 1) {
                      res.status(200).json({ message: 'Profil supprimé !'});
                  } else {
                      res.status(400).json({ error });
                  }
              })
        })
    })
    .catch(error => {
        res.status(500).json({error});
    });
};
