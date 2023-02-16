const { Router } = require('express');
const {User} = require('../db.js');
const axios = require('axios');
const {requiresAuth } = require('express-openid-connect');
const session = require('express-session');
const { jwtCheck , checkScopes} = require("../middlewares/jwtCheck.js");

const router = Router();

router.get('/', async (req, res) => {
    res.status(200).send("Ruta publica")
})

router.get('/protected', jwtCheck , checkScopes, async (req, res) => {
      /* try {
         const accessToken = req.headers.authorization.split(' ')[1]
         console.log(accessToken)
         const response = await axios.get("https://dev-kvjr54lumq4827tu.us.auth0.com/api/v2/users/google-oauth2%7C112318356800084041668?fields=email&include_fields=true",{
         //"https://dev-kvjr54lumq4827tu.us.auth0.com/userinfo"
         //const response = await axios.get("https://dev-cz6i21an2opri7kv.us.auth0.com/userinfo", {
             headers:{
                Authorization: `Bearer `,
             }
         } )
         const userinfo = response.data
         res.send(userinfo)
     } catch (error) {
         res.send(error.message)
     }
  */
    res.send("Ruta protegida por middleware: jwCheck y scopes")
})

/* router.get('/getToken', async(req, res) => {
    try {
        const responde = await
        axios({
            method: 'post',
            url: 'https://dev-kvjr54lumq4827tu.us.auth0.com/oauth/token',
            headers: {'content-type': 'application/json' }, 
            data: {
                "client_id":"GL4ZdJU4FKFshNgg90qty9wDNGfISceP",
                "client_secret":"yp378geIG8UEPKgO1KPkP-zvGXsDq0irhft3NBq-QwlY_0Rlomu7oEyJwN8GjogW",
                "audience":"this is a unique identifier viator",
                "grant_type":"client_credentials"
            }
          });
        const tok = responde.data
    
        res.send(tok)
    } catch (error) {
        res.send(error.message)
    }
}) */

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
                res.status(200).send("Usuario en la base de datos")
            }else{
                res.status(404).send("Usuario no encontrado")
            }
        }
    } catch (error) {
        res.send(error.message)
    }

})

router.post('/register', jwtCheck , checkScopes, async (req, res) => {
    //const {given_name, family_name, nickname, email, phone, picture} = req.body

    const sub = await req.body.sub.split("|")[0]
    console.log(sub)
    console.log(req.body.nickname)

    try {
        if(sub === "auth0"){
            console.log("entra al auth")
             await User.create({
                id:req.body.sub,
                nickname: req.body.nickname,
                picture: req.body.picture,
                email: req.body.email,
                
            }) 
            res.status(200).send("Usuario creado con exito")
        }if(sub === "google-oauth2"){
            console.log("entra al google outh2")
            await User.create({
                //givenName: req.oidc.user.given_name,
                //familyName: req.oidc.user.family_name,
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