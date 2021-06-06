const express = require('express');

const router = express.Router();

router.get('/', (req, res)  => {
    res.render('login');
});

router.get('/views/index.hbs', (req, res)  => {
    res.render('index');
});

router.get('/views/login.hbs', (req, res)  => {
    res.render('login');
});

router.get('/views/characters.hbs', (req, res)  => {
    res.render('characters')
});

router.get('/views/comics.hbs', (req, res)  => {
    res.render('comics')
});

router.get('/views/register.hbs', (req, res)  => {
    res.render('register');
});

module.exports = router;