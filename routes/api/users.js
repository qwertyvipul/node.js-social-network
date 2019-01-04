const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    Return all users
// @access  Public
router.get('/', (req, res) => {
    res.json({
        page: 'users'
    });
});

module.exports = router;