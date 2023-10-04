const {authRequired} = require('../middlewares/validateToken.js');
const router = require('express').Router();

router.get('/pep', authRequired, (req, res) => {
    res.json({message: "pep"});
});

module.exports = router;
