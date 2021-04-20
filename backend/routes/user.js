const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const rateLimit = require("express-rate-limit");

const userCtrl = require('../controllers/user');
const followCtrl = require("../controllers/follow");

const accountLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: "Trop de tentatives, réessayer dans 15 minutes"
});

/////AUTHENTIFICATION
router.post('/auth/signup', userCtrl.signup);
router.post('/auth/login', accountLimiter, userCtrl.login);

/////USERS
router.get('/users/:id', auth, userCtrl.getOneUser);
router.get('/users', auth, userCtrl.getAllUsers);
router.put('/users/:id', auth, userCtrl.modifyOneUser);
router.delete('/users/:id', auth, userCtrl.deleteOneUser);

router.post("/users/:id/follows", auth, followCtrl.createOneFollow);
router.get("/users/:id/follows", auth, followCtrl.getAllFav);

module.exports = router;