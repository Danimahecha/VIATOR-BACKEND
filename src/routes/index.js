const { Router } = require('express');
const { jwtCheck , checkScopes} = require("../middlewares/jwtCheck.js");
const {getUser, getUsers, createUser, updateUser, deleteUser} = require('../controllers/users.controllers.js');
const { get_airline, get_id_airline, create_airline, update_airline} = require('../controllers/airlines.controllers.js');
const {getFlights, getFlight, createFlight, updateFlight, deleteFlight} = require('../controllers/flights.controllers.js');
const {getTickets, getTicket, createTicket, updateTicket, deleteTicket} = require('../controllers/tickets.controllers.js');
const {postLogin, postRegister, putSetInfo} = require('../controllers/login.controllers.js');
const getRecommendedFlights = require('../controllers/flights.recomend.js');
const {getFlightsScale0,getFlightsScale1,getFlightsScale2} =require('../controllers/flightScale');
const router = Router();

//Users
router.get('/getUsers', getUsers);
router.post('/createUser', createUser);
router.put('/updateUser/:id',updateUser);
router.delete('/deleteUser/:id',deleteUser);
router.get('/getUser/:id',getUser );

//Airlines
router.get('/api/airlines',get_airline)
router.post('/api/airlines',create_airline)
router.put('/api/airlines/:id',update_airline)
//router.delete('/api/airlines/:id',delete_airline)
router.get('/api/airlines/:id',get_id_airline)

//Flights
router.get('/api/flights', getFlights);
router.post('/api/flights', createFlight);
router.put('/api/flights/:id',updateFlight);
router.delete('/api/flights/:id',deleteFlight);
router.get('/api/flights/:id',getFlight );
//scale
router.get('/api/0ScaleFlights',getFlightsScale0);
router.get('/api/1ScaleFlights',getFlightsScale1);
router.get('/api/2ScaleFlights',getFlightsScale2)

//recommended Flights
router.get('/api/recommended', getRecommendedFlights);

//Tickets
router.get('/api/tickets', getTickets);
router.post('/api/tickets', createTicket);
router.put('/api/tickets/:id',updateTicket);
router.delete('/api/tickets/:id',deleteTicket);
router.get('/api/tickets/:id',getTicket );

//Login - Register
router.post('/register', jwtCheck, postRegister)
router.post('/login', jwtCheck, postLogin)
router.put('/setInfo', jwtCheck , putSetInfo)

module.exports = router;