const { Router } = require('express');
const {User} = require('../db.js');
const {requiresAuth } = require('express-openid-connect');
const session = require('express-session');
const { jwtCheck , checkScopes} = require("../middlewares/jwtCheck.js");

const router = Router();

router.get('/', async (req, res) => {
    res.status(200).send("Ruta publica")
})

router.get('/protected', jwtCheck , async (req, res) => {

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

router.get("/profile" ,jwtCheck , async (req, res) => {
    //funcion perfil necesita useParamas para implementar
})

router.post('/register', jwtCheck , async (req, res) => {

    //const sub = await req.body.sub.split("|")[0]

    try {
        await User.create({
            id:req.body.sub,
            email: req.body.email,
            picture: req.body.picture,
        })
        res.status(200).send("Usuario creado con exito")
    }catch (error) {
        res.status(500).send(error.message)
    }
})

router.put('/setInfo', jwtCheck , async(req, res) => {
    const {names, lastNames, nickname,DateOfBirth,phoneNumber,country,city,picture, email, idSubAuth0} = req.body

    const user = await User.findByPk(idSubAuth0)
   
    try {
        await user.update({
            givenName: names,
            familyName: lastNames,
            nickName: nickname,
            phone: phoneNumber,
            email: email,
            country: country,
            city:city,
            birthdate: DateOfBirth,
            picture: picture
        })
    
        await user.save()
        res.status(200).send("Actualizado correctamente")
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router;