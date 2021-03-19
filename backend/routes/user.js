const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');
const followCtrl = require("../controllers/follow");

/////AUTHENTIFICATION
router.post('/auth/signup', userCtrl.signup);
router.post('/auth/login', userCtrl.login);

router.get('/users/:id', auth, userCtrl.getOneUser);
router.get('/users', auth, userCtrl.getAllUsers);
router.put('/users/:id', auth, userCtrl.modifyOneUser);
router.delete('/users/:id', auth, userCtrl.deleteOneUser);

router.post("/users/:id/follows", auth, followCtrl.createOneFollow);
router.get("/users/:id/follows", auth, followCtrl.getAllFav);

module.exports = router;