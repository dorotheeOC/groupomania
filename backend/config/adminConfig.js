const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.users;

insertAdmin = (req, res) => {
  User.findOne({ where: { email: "admin@gmail.com" } || { pseudo: "admin" } })
    .then((user) => {
      if (!user) {
        bcrypt.hash("password123+", 10)
          .then((hash) => {
            User.create({
              email: "admin@gmail.com",
              password: hash,
              role: 'admin',
            })
              .then(() => {
                console.log({ message: 'Admin créé !'});
              })
              .catch((error) => {
                res.status(400).json({ error });
              });
          })
          .catch((error) => {
            res.status(500).send({ error });
          });
      } else {
        console.log({ message: "Un admin existe déjà !" });
      }
    })
    .catch((error) => {
      console.log({ error });
    });
}
module.exports = insertAdmin();
