const { Router } = require('express');
const {User, Fligth} = require('../db.js');
const {requiresAuth } = require('express-openid-connect');
const session = require('express-session');
const { jwtCheck , checkScopes} = require("../middlewares/jwtCheck.js");
const {createUser} = require('../controllers/users.controllers.js');
const { get_airline, get_id_airline, create_airline, update_airline} = require('../controllers/airlines.controllers.js');
const {getFlights, getFlight, createFlight, updateFlight, deleteFlight} = require('../controllers/flights.controllers.js');
const {getTickets, getTicket, createTicket, updateTicket, deleteTicket} = require('../controllers/tickets.controllers.js');

const router = Router();

router.get('/', async (req, res) => {
    res.status(200).send("Ruta publica")
})

router.get('/protected', jwtCheck , async (req, res) => {

    res.send("Ruta protegida por middleware: jwCheck y scopes")

})

router.post('/createUser', createUser)

router.get('/api/airlines',get_airline)
router.post('/api/airlines',create_airline)
router.put('/api/airlines/:id',update_airline)
//router.delete('/api/airlines/:id',delete_airline)
router.get('/api/airlines/:id',get_id_airline)

router.get('/api/flights', getFlights);
router.post('/api/flights', createFlight);
router.put('/api/flights/:id',updateFlight);
router.delete('/api/flights/:id',deleteFlight);
router.get('/api/flights/:id',getFlight );

router.get('/api/tickets', getTickets);
router.post('/api/tickets', createTicket);
router.put('/api/tickets/:id',updateTicket);
router.delete('/api/tickets/:id',deleteTicket);
router.get('/api/tickets/:id',getTicket );

router.post('/filterFrom', async(req, res) => {
    const {from} =req.body

    try {
        if(Fligth.findAll().length > 0){
            const fligth = Fligth.findOne({ where: { from: from } })
            res.status(200).send(fligth)
        }
    } catch (error) {
        res.send(error.message)
    }
})

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