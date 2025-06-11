const express = require('express');
const router = express.Router();
const {createResume} = require('../Controllers/resumeController');

router.post('/user/:userId/create-resume',createResume)

module.exports = router;