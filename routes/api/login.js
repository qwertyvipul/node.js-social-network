const express = require('express');
const router = express.Router();

// @route   POST api/register
// @desc    Login user
// @access  Private
router.post('/', (req, res) => {
    res.json({
        page: 'login'
    });
});

module.exports = router;