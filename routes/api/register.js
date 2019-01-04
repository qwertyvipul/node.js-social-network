const express = require('express');
const router = express.Router();

// @route   POST api/register
// @desc    Register user
// @access  Private
router.post('/', (req, res) => {
    res.json({
        page: 'register'
    });
});

module.exports = router;