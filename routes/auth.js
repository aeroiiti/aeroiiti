const express = require('express');
const router = express.Router();

// @route   GET /auth
// @desc    get logged in user
// @access  Private
router.get('/', (req, res) => {
    res.send("get logged in user");
});

// @route   POST /auth
// @desc    auth user and get token
// @access  Public
router.post('/', (req, res) => {
    res.send("login user");
});

module.exports = router;