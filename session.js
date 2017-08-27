
const express = require('express');
const router = express.Router();

module.exports = router;
router.route('/')
    .post((req, res, next)=>{
        const {jssession} = req.body;
        const day = 1000 * 3600 * 24;
        res.cookie('jssession', jssession, { maxAge: day });
        return res.redirect('/');
    })
    .get((req, res, next)=>{
        return res.redirect('/');
    })


