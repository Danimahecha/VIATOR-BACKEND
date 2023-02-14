const { Router } = require('express');
const {Model} = require('../db.js');
//const axios = require('axios');
const {requiresAuth } = require('express-openid-connect');

const router = Router();
router.get('/', (req, res) =>{
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

router.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user))
})

module.exports = router;