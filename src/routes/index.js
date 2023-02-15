const { Router } = require('express');
const {User} = require('../db.js');
//const axios = require('axios');
const {requiresAuth } = require('express-openid-connect');
const session = require('express-session')

const router = Router();

router.get('/', async (req, res) =>{
    
    res.send(req.oidc.isAuthenticated() ? req.session.user = req.oidc.user.nickname : 'Logged out')
})

router.get('/profile', requiresAuth(), async (req, res) => {
    //res.send(JSON.stringify(req.oidc.user))
    const user = await User.findOne({where: {sub: req.oidc.user.sub}})

    res.send(user)
})

router.post('/register', requiresAuth(), async (req, res) => {
    //const {given_name, family_name, nickname, email, phone, picture} = req.body

    const sub = await req.oidc.user.sub.split("|")[0]

    try {
        if(sub === "auth0"){
            await User.create({
                nickname: req.oidc.user.nickname,
                picture: req.oidc.user.picture,
                email: req.oidc.user.email,
                sub: req.oidc.user.sub
            })
            res.status(200).send("Usuario creado con exito")
        }if(sub === "google-oauth2"){
            await User.create({
                givenName: req.oidc.user.given_name,
                familyName: req.oidc.user.family_name,
                nickname: req.oidc.user.nickname,
                picture: req.oidc.user.picture,
                email: req.oidc.user.email,
                sub: req.oidc.user.sub
            })
            res.status(200).send("Usuario creado con exito")
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/setInfo', requiresAuth(), async(req, res) => {
    const {given_name, family_name, nickname, email, phone, picture, id} = req.body

    const user = await User.findByPk(id)

    try {

        await user.update({
            givenName: given_name,
            familyName: family_name,
            nickname: nickname,
            phone: phone,
            email: email,
            picture: picture
        })
    
        await user.save()
        
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router;