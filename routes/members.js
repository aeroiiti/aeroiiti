const express = require('express');
const router = express.Router();

// @route   POST /members
// @desc    Register a member
// @access  Public
router.post('/', (req, res) => {
    res.send("register a member");
});

module.exports = router;