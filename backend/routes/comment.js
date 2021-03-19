const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const comCtrl = require('../controllers/comment');

router.get("/comments", auth, comCtrl.getAllReportedComments);

module.exports = router;