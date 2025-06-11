const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getUserById} = require('../Controllers/userController');

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/:userId',getUserById)

module.exports = router;