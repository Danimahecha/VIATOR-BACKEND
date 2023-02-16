const { Router } = require('express');
const {User} = require('../db.js');
const {requiresAuth } = require('express-openid-connect');
const session = require('express-session');
const { jwtCheck , checkScopes} = require("../middlewares/jwtCheck.js");

const router = Router();

router.get('/', async (req, res) => {
    res.status(200).send("Ruta publica")
})

router.get('/protected', jwtCheck , checkScopes, async (req, res) => {

    res.send("Ruta protegida por middleware: jwCheck y scopes")

})

/* router.get('/login/:id', async (req, res) =>{
    const {id} = req.params
    try {
        if(id){
            const user = await User.findByPk(id)
            if(user){
                res.status(200).send("Usuario autentificado")
            }else{
                res.status(404).send("Usuario no encontrado")
            }
        }
    } catch (error) {
        res.send(error.message)
    }

}) */

router.post('/login', async (req, res) =>{
    const {id} = req.body
    try {
        if(id){
            const user = await User.findByPk(id)
            if(user){
                res.status(200).send("True")
            }else{
                res.status(404).send("False")
            }
        }
    } catch (error) {
        res.send(error.message)
    }

})

router.post('/register', jwtCheck , checkScopes, async (req, res) => {

    const sub = await req.body.sub.split("|")[0]

    try {
        if(sub === "auth0"){
            
             await User.create({
                id:req.body.sub,
                nickname: req.body.nickname,
                picture: req.body.picture,
                email: req.body.email,
            }) 

            res.status(200).send("Usuario creado con exito")

        }if(sub === "google-oauth2"){
            
            await User.create({
                givenName: req.body.given_name,
                familyName: req.body.family_name,
                id:req.body.sub,
                nickname: req.body.nickname,
                picture: req.body.picture,
                email: req.body.email,
            })
            res.status(200).send("Usuario creado con exito")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.put('/setInfo', jwtCheck , checkScopes, async(req, res) => {
    const {given_name, family_name, nickname, email, phone, picture, id} = req.body

    const user = await User.findByPk(id)
   
    try {
        await user.update({
            givenName: given_name,
            familyName: family_name,
            nickName: nickname,
            phone: phone,
            email: email,
            picture: picture
        })
    
        await user.save()
        res.status(200).send("Actualizado correctamente")
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router;